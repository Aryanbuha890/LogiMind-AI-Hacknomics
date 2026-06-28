import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-white selection:bg-blue-500/30">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Logo size="sm" />
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
            </div>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-invert prose-blue max-w-none text-slate-700">
            <p>
              At LogiMind AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our autonomous intelligence platform for ports and rail terminals.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">1. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Site includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
              <li><strong className="text-white">Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              <li><strong className="text-white">Operational Data:</strong> Data related to port, vessel, and rail operations uploaded or connected to our platform to utilize our predictive maintenance, telemetry, and AI agent services.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">2. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li>Provide, operate, and maintain our platform and services.</li>
              <li>Improve, personalize, and expand our platform.</li>
              <li>Understand and analyze how you use our platform.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the platform.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">3. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
              <li><strong className="text-white">By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
              <li><strong className="text-white">Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">4. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mt-4 inline-block">
              <p className="font-semibold text-slate-900">LogiMind AI Security Team</p>
              <p className="text-blue-400 mt-1">privacy@logimind.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
