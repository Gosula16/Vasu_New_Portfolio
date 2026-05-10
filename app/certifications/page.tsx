import type { Metadata } from "next";
import { CertificationsView } from "@/components/certifications/certifications-view";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certificates and achievements.",
};

export default function CertificationsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <CertificationsView />
    </main>
  );
}
