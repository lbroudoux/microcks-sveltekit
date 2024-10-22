import type { SvelteComponent } from "svelte";

export interface WizardConfig {
  triggerValue?: string;
  submitValue?: string;
  title: string;
  description?: string;
  steps: WizardStep[];
}

export interface WizardStep {
  title: string;
  stepName?: string;
  icon?: typeof SvelteComponent;
  description?: string;
  inputs: WizardStepInput[];
}

export interface WizardStepInput {
  label: string;
  name: string;
  id?: string;
  description?: string;
  placeholder?: string;
  type: "text" | "textarea" | "checkbox";
  required?: boolean;
}

export interface WizardFormValues {
  [key: string]: string | boolean;
}
