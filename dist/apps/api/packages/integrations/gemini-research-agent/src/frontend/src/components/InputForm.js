"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputForm = void 0;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const InputForm = ({ onSubmit, onCancel, isLoading, hasHistory, }) => {
    const [internalInputValue, setInternalInputValue] = (0, react_1.useState)("");
    const [effort, setEffort] = (0, react_1.useState)("medium");
    const [model, setModel] = (0, react_1.useState)("gemini-2.5-flash-preview-04-17");
    const handleInternalSubmit = (e) => {
        if (e)
            e.preventDefault();
        if (!internalInputValue.trim())
            return;
        onSubmit(internalInputValue, effort, model);
        setInternalInputValue("");
    };
    const handleKeyDown = (e) => {
        // Submit with Ctrl+Enter (Windows/Linux) or Cmd+Enter (Mac)
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleInternalSubmit();
        }
    };
    const isSubmitDisabled = !internalInputValue.trim() || isLoading;
    return (<form onSubmit={handleInternalSubmit} className={`flex flex-col gap-2 p-3 pb-4`}>
      <div className={`flex flex-row items-center justify-between text-white rounded-3xl rounded-bl-sm ${hasHistory ? "rounded-br-sm" : ""} break-words min-h-7 bg-neutral-700 px-4 pt-3 `}>
        <textarea_1.Textarea value={internalInputValue} onChange={(e) => setInternalInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Who won the Euro 2024 and scored the most goals?" className={`w-full text-neutral-100 placeholder-neutral-500 resize-none border-0 focus:outline-none focus:ring-0 outline-none focus-visible:ring-0 shadow-none
                        md:text-base  min-h-[56px] max-h-[200px]`} rows={1}/>
        <div className="-mt-3">
          {isLoading ? (<button_1.Button type="button" variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 cursor-pointer rounded-full transition-all duration-200" onClick={onCancel}>
              <lucide_react_1.StopCircle className="h-5 w-5"/>
            </button_1.Button>) : (<button_1.Button type="submit" variant="ghost" className={`${isSubmitDisabled
                ? "text-neutral-500"
                : "text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"} p-2 cursor-pointer rounded-full transition-all duration-200 text-base`} disabled={isSubmitDisabled}>
              Search
              <lucide_react_1.Send className="h-5 w-5"/>
            </button_1.Button>)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 bg-neutral-700 border-neutral-600 text-neutral-300 focus:ring-neutral-500 rounded-xl rounded-t-sm pl-2  max-w-[100%] sm:max-w-[90%]">
            <div className="flex flex-row items-center text-sm">
              <lucide_react_1.Brain className="h-4 w-4 mr-2"/>
              Effort
            </div>
            <select_1.Select value={effort} onValueChange={setEffort}>
              <select_1.SelectTrigger className="w-[120px] bg-transparent border-none cursor-pointer">
                <select_1.SelectValue placeholder="Effort"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-300 cursor-pointer">
                <select_1.SelectItem value="low" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  Low
                </select_1.SelectItem>
                <select_1.SelectItem value="medium" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  Medium
                </select_1.SelectItem>
                <select_1.SelectItem value="high" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  High
                </select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>
          <div className="flex flex-row gap-2 bg-neutral-700 border-neutral-600 text-neutral-300 focus:ring-neutral-500 rounded-xl rounded-t-sm pl-2  max-w-[100%] sm:max-w-[90%]">
            <div className="flex flex-row items-center text-sm ml-2">
              <lucide_react_1.Cpu className="h-4 w-4 mr-2"/>
              Model
            </div>
            <select_1.Select value={model} onValueChange={setModel}>
              <select_1.SelectTrigger className="w-[150px] bg-transparent border-none cursor-pointer">
                <select_1.SelectValue placeholder="Model"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent className="bg-neutral-700 border-neutral-600 text-neutral-300 cursor-pointer">
                <select_1.SelectItem value="gemini-2.0-flash" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  <div className="flex items-center">
                    <lucide_react_1.Zap className="h-4 w-4 mr-2 text-yellow-400"/> 2.0 Flash
                  </div>
                </select_1.SelectItem>
                <select_1.SelectItem value="gemini-2.5-flash-preview-04-17" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  <div className="flex items-center">
                    <lucide_react_1.Zap className="h-4 w-4 mr-2 text-orange-400"/> 2.5 Flash
                  </div>
                </select_1.SelectItem>
                <select_1.SelectItem value="gemini-2.5-pro-preview-05-06" className="hover:bg-neutral-600 focus:bg-neutral-600 cursor-pointer">
                  <div className="flex items-center">
                    <lucide_react_1.Cpu className="h-4 w-4 mr-2 text-purple-400"/> 2.5 Pro
                  </div>
                </select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>
        </div>
        {hasHistory && (<button_1.Button className="bg-neutral-700 border-neutral-600 text-neutral-300 cursor-pointer rounded-xl rounded-t-sm pl-2 " variant="default" onClick={() => window.location.reload()}>
            <lucide_react_1.SquarePen size={16}/>
            New Search
          </button_1.Button>)}
      </div>
    </form>);
};
exports.InputForm = InputForm;
//# sourceMappingURL=InputForm.js.map