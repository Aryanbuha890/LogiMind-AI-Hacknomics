import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsAndConditions,
});

function TermsAndConditions() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileText className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Terms and Conditions</h1>
            </div>
            <p className="text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none text-slate-300">
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and LogiMind AI ("we," "us," or "our"), concerning your access to and use of our autonomous intelligence platform and website.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">1. Agreement to Terms</h2>
            <p>
              By accessing the Site and utilizing our services, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and our services and you must discontinue use immediately.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site and our platform are our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">3. User Representations</h2>
            <p>
              By using the Site and our platform, you represent and warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">Authorization:</strong> You have the legal capacity and authority to enter into these Terms and Conditions.</li>
              <li><strong className="text-white">Lawful Use:</strong> You will not use the platform for any illegal or unauthorized purpose.</li>
              <li><strong className="text-white">Accuracy:</strong> All registration information you submit will be true, accurate, current, and complete.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">4. Platform Access and Use</h2>
            <p>
              We grant you a non-exclusive, non-transferable, revocable license to access and use our platform strictly in accordance with these Terms. As a user, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li>Systematically retrieve data or other content from the platform to create or compile a database or directory without written permission from us.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the platform.</li>
              <li>Attempt to bypass any measures of the platform designed to prevent or restrict access.</li>
              <li>Interfere with, disrupt, or create an undue burden on the platform or the networks or services connected to it.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">5. Limitations of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the platform.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">6. Contact Information</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4 inline-block">
              <p className="font-semibold text-white">LogiMind AI Legal Department</p>
              <p className="text-indigo-400 mt-1">legal@logimind.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
