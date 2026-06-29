import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/security-details")({
  component: SecurityDetails,
});

function SecurityDetails() {
  return (
    <div className="min-h-screen bg-[#05060F] text-white selection:bg-blue-500/30">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Logo size="sm" />
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Security Details</h1>
            </div>
            <p className="text-slate-400">LogiMind AI Infrastructure & Data Protection</p>
          </div>

          <div className="prose prose-invert prose-emerald max-w-none text-slate-300">
            <p>
              At LogiMind AI, security is treated as a first-class priority. Operating in highly regulated environments like ports and intermodal rail yards requires rigorous security standards, and our platform architecture is built from the ground up to protect your operational data.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">1. Compliance & Certifications</h2>
            <p>
              Our infrastructure and operations align with industry-leading compliance standards to ensure trust and reliability:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">SOC 2 Type II:</strong> We undergo regular audits to ensure our security controls, availability, and confidentiality practices meet strict AICPA standards.</li>
              <li><strong className="text-white">ISO 27001:</strong> We maintain a rigorous Information Security Management System (ISMS).</li>
              <li><strong className="text-white">GDPR & CCPA Compliant:</strong> Stringent data privacy controls and user data management policies.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">2. Data Encryption</h2>
            <p>
              All customer and operational data is heavily encrypted both in transit and at rest using industry-standard protocols.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">In Transit:</strong> All network traffic between your terminals and our cloud is encrypted via TLS 1.3.</li>
              <li><strong className="text-white">At Rest:</strong> Data stored in our databases and object stores is encrypted using AES-256 encryption keys managed via AWS KMS / Azure Key Vault.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">3. Access Control & Identity</h2>
            <p>
              We implement zero-trust architecture principles to ensure only authenticated and authorized personnel can access critical systems.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">SSO & MFA:</strong> Support for SAML 2.0 and OIDC (Okta, Azure AD, Google Workspace) with enforced Multi-Factor Authentication.</li>
              <li><strong className="text-white">Role-Based Access Control (RBAC):</strong> Granular permissions ensuring users only have access to the terminals, yards, or data they explicitly require.</li>
              <li><strong className="text-white">Audit Logging:</strong> Every action taken within the platform is securely logged, immutable, and easily auditable.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">4. Edge Device Security</h2>
            <p>
              For ports and rail yards using our physical telemetry and computer vision nodes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li>Devices operate in isolated VPCs with no inbound public internet access.</li>
              <li>Over-The-Air (OTA) updates are cryptographically signed.</li>
              <li>Hardware root of trust prevents physical tampering and unauthorized booting.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">5. Incident Response & Bug Bounty</h2>
            <p>
              We maintain a 24/7 Security Operations Center (SOC) capable of instantly responding to threat vectors. We also run a private bug bounty program to continually crowdsource penetration testing from the security community.
            </p>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-8 inline-block">
              <p className="font-semibold text-white">Report a Vulnerability</p>
              <p className="text-slate-400 mt-1 mb-2 text-sm">If you believe you have found a security vulnerability, please contact us immediately.</p>
              <p className="text-emerald-400">security@logimind.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
