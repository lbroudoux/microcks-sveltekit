import Wizard from "./wizard.svelte";
import Wizard2 from "./wizard2.svelte";
import WizardStep from "./wizard-step.svelte";

export { Wizard, Wizard2, WizardStep };
export type { WizardConfig, WizardStepConfig };

interface WizardConfig {
  title: string;
  sidebarStyleClass?: string;
  stepStyleClass?: string;
}

interface WizardStepConfig {
  id: string;
  title: string;
  expandReviewDetails?: boolean;
  nextEnabled?: boolean;
}
