import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("[api/registration] incoming body", body);

    const pincodeValue = Array.isArray(body.pincode)
      ? body.pincode.join("")
      : body.pincode;

    const payload = { ...body, pincode: pincodeValue };

    // Check duplicates by email or phone
    const existing = await Registration.findOne({
      $or: [{ email: payload.email }, { phone: payload.phone }],
    }).lean();
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Already registered with this email or phone. Please use new details.",
        },
        { status: 409 }
      );
    }

    const created = await Registration.create(payload);
    console.log("[api/registration] created id", created._id.toString());

    return NextResponse.json(
      { success: true, id: created._id },
      { status: 201 }
    );
  } catch (error) {
    if (error?.name === "ValidationError") {
      console.warn("[api/registration] validation error", error.errors);
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    // Duplicate key error fallback
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Already registered with this email or phone. Please use new details.",
        },
        { status: 409 }
      );
    }
    console.error("[api/registration] error", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Registration.estimatedDocumentCount();
    return NextResponse.json({ ok: true, connected: true, count });
  } catch (err) {
    console.error("[api/registration] GET health error", err);
    return NextResponse.json({ ok: false, connected: false }, { status: 500 });
  }
}
