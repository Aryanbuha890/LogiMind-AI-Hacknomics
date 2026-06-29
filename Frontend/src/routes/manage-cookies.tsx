import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cookie } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/manage-cookies")({
  component: ManageCookies,
});

function ManageCookies() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Cookie className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Cookie Policy</h1>
            </div>
            <p className="text-slate-400">Manage your cookie preferences and learn how we use trackers.</p>
          </div>

          <div className="prose prose-invert prose-orange max-w-none text-slate-300">
            <p>
              LogiMind AI uses cookies and similar tracking technologies to track the activity on our platform and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">What are Cookies?</h2>
            <p>
              Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">Types of Cookies We Use</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h3 className="text-lg font-medium text-white flex items-center justify-between">
                  Strictly Necessary Cookies
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">Always Active</span>
                </h3>
                <p className="mt-2 text-sm">
                  These cookies are essential to provide you with services available through our platform and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these cookies, the services that you have asked for cannot be provided.
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl border border-white/10 opacity-75">
                <h3 className="text-lg font-medium text-white flex items-center justify-between">
                  Performance & Analytics Cookies
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20">Optional</span>
                </h3>
                <p className="mt-2 text-sm">
                  These cookies track information about traffic to the Website and how users use the platform. The information gathered via these cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website.
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl border border-white/10 opacity-75">
                <h3 className="text-lg font-medium text-white flex items-center justify-between">
                  Functionality Cookies
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20">Optional</span>
                </h3>
                <p className="mt-2 text-sm">
                  These cookies allow us to remember choices you make when you use the Website, such as remembering your login details or language preference. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you use the Website.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-white/10 pb-2">Your Choices Regarding Cookies</h2>
            <p>
              If you prefer to avoid the use of cookies on the Website, first you must disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
            </p>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <p className="font-semibold text-white">Need help managing your cookies?</p>
                <p className="text-slate-400 text-sm">Our support team can assist you with your privacy preferences.</p>
              </div>
              <a href="mailto:privacy@logimind.ai" className="bg-white hover:bg-slate-200 text-black px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
                Contact Privacy Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
