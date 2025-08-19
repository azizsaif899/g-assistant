"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ScrollAreaPrimitive = tslib_1.__importStar(require("@radix-ui/react-scroll-area"));
const utils_1 = require("@/lib/utils");
function ScrollArea({ className, children, ...props }) {
    return (<ScrollAreaPrimitive.Root data-slot="scroll-area" className={(0, utils_1.cn)("relative", className)} {...props}>
      <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1" style={{ overscrollBehavior: 'none' }}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>);
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return (<ScrollAreaPrimitive.ScrollAreaScrollbar data-slot="scroll-area-scrollbar" orientation={orientation} className={(0, utils_1.cn)("flex touch-none p-px transition-colors select-none", orientation === "vertical" &&
            "h-full w-1.5 border-l border-l-transparent", orientation === "horizontal" &&
            "h-1.5 flex-col border-t border-t-transparent", className)} {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className="bg-neutral-600/30 relative flex-1 rounded-full"/>
    </ScrollAreaPrimitive.ScrollAreaScrollbar>);
}
//# sourceMappingURL=scroll-area.js.map