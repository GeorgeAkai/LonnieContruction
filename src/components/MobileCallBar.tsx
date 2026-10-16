import { MessageSquareText, Phone, ClipboardList } from "lucide-react";
import { site } from "@/lib/site";

/** Thumb-friendly CTA bar pinned to the bottom of the screen on phones. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1fr_auto_auto] gap-2">
        <a
          href={site.phoneHref}
          className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/30 active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" /> Call Now
        </a>
        <a
          href={site.smsHref}
          aria-label="Send a text message"
          className="flex h-13 w-14 flex-col items-center justify-center rounded-2xl bg-ink text-[10px] font-semibold text-white active:scale-95"
        >
          <MessageSquareText className="h-5 w-5" />
          Text
        </a>
        <a
          href="#contact"
          aria-label="Request a free estimate"
          className="flex h-13 w-14 flex-col items-center justify-center rounded-2xl border border-black/10 bg-white text-[10px] font-semibold active:scale-95"
        >
          <ClipboardList className="h-5 w-5" />
          Quote
        </a>
      </div>
    </div>
  );
}
