import { describe, expect, it } from "vitest";

import { buildInspectionMessage, inspectionRequestSchema } from "@/lib/inspection";

describe("inspection request validation and WhatsApp message", () => {
  it("accepts complete details with a formatted local phone number", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "+234 806 866 0602",
      eventType: "Wedding",
      guests: "120",
      preferredDate: "2027-06-12",
    }).success).toBe(true);
  });

  it("rejects a phone number containing URL or markup characters", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "https://example.com",
      eventType: "Wedding",
      guests: "120",
      preferredDate: "2027-06-12",
    }).success).toBe(false);
  });

  it("rejects guest counts outside the supported 1–10,000 range", () => {
    expect(inspectionRequestSchema.safeParse({
      fullName: "Amara Okafor",
      phone: "08068660602",
      eventType: "Wedding",
      guests: "0",
      preferredDate: "2027-06-12",
    }).success).toBe(false);
  });

  it("builds an encoded-message-ready booking request with all submitted details", () => {
    expect(buildInspectionMessage({
      fullName: "Amara Okafor",
      phone: "+234 806 866 0602",
      eventType: "Wedding",
      guests: 120,
      preferredDate: "2027-06-12",
    })).toContain("Name: Amara Okafor\nPhone: +234 806 866 0602\nEvent: Wedding\nEstimated guests: 120\nPreferred date: 2027-06-12");
  });
});