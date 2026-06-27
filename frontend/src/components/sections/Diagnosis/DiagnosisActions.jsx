import { Sparkles } from "lucide-react";

import Button from "../../common/Button";

export default function DiagnosisActions() {
  return (
    <div className="mt-8 flex flex-col items-center">

      <Button className="px-10 py-4 text-base">

        <Sparkles
          size={18}
          className="mr-2"
        />

        Analyze Symptoms

      </Button>

      <p className="mt-5 text-sm text-slate-500">

        Your information is processed securely and is never shared.

      </p>

    </div>
  );
}