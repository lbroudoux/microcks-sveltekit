<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Wizard, Wizard2, WizardStep, type WizardConfig, type WizardStepConfig } from "$lib/components/ui/wizard2";
  import { ServiceType, type Api } from "$lib/models/service.model";

  interface Props {
    isOpen: boolean;
  }

  let { isOpen }: Props = $props();

  let api: Api = {} as Api;
  let apiType: ServiceType | undefined;
  
  const wizardConfig: WizardConfig = {
    title: 'Add a new Direct API'
  };
  let step1Config: WizardStepConfig = {
    id: 'step1',
    title: 'Direct API type',
    nextEnabled: false,
    expandReviewDetails: true,
  };
  let step2Config: WizardStepConfig = {
    id: 'step2',
    title: 'API properties',
    nextEnabled: false,
    expandReviewDetails: true,
  };
  let step3Config: WizardStepConfig = {
    id: 'step3',
    title: 'Reference payload',
    nextEnabled: true,
    expandReviewDetails: true,
  };
  let step4Config: WizardStepConfig = {
    id: 'step4',
    title: 'Review',
    nextEnabled: false
  };
  let stepConfigs = [step1Config, step2Config, step3Config, step4Config];

  function nextClicked(step: number): void {
    console.log("In DirectApiWizard nextCliked()");
    console.log("step:", step);
    if (step == 3) {
      // Validate the wizard by creating the Direect API.
    }
  }

  function stepChanged(step: number) {
    console.log("In DirectApiWizard stepChanged()");
    if (step == 0) {
      //this.updateApiType();
    } else if (step == 1) {
      //this.updateApiProperties();
    } else if (step == 2) {
      //this.updateApiReference();
    } else {
      
    }
  }

  function cancel(): void {
    console.log("In DirectApiWizard cancelWizard()");
  }

  function changeApiType(type: ServiceType): void {
    apiType = type;
    updateApiType();
  }
  function updateApiType(): void {
    step1Config.nextEnabled =
      (apiType !== undefined && apiType != null &&
        (apiType == ServiceType.GENERIC_REST || apiType == ServiceType.GENERIC_EVENT));
    console.log("In DirectApiWizard updateApiType()");
    console.log("step1Config.nextEnabled:", step1Config.nextEnabled);
  }
  function updateApiProperties(): void {
  }
  function updateApiReference(): void {
  }

  onMount(() => {
    console.log("In DirectApiWizard onMount()");
  });
</script>

{#snippet step1View()}
<div class="text-center">
  <h2 class="api-type-title"><span class="fa fa-rocket"></span> Choose your API type</h2>
</div>
<form class="form-horizontal">
  <fieldset>
    <div class="row">
      <div class="col-xs-2"></div>
      <div class="col-xs-4">
        <Card.Root onclick={() => changeApiType(ServiceType.GENERIC_REST)}>
          <Card.Header>
            <Card.Title>REST API</Card.Title>
          </Card.Header>
          <Card.Content>
            A simple RESTful API with CRUD operations on JSON resources - represented with <b>OpenAPI</b> spec.
          </Card.Content>
        </Card.Root>
      </div>
      <div class="col-xs-4">
        <Card.Root onclick={() => changeApiType(ServiceType.GENERIC_EVENT)}>
          <Card.Header>
            <Card.Title>Event Driven API</Card.Title>
          </Card.Header>
          <Card.Content>
            A simple asynchronous API that publishes JSON events - represented with <b>AsyncAPI</b> spec.
          </Card.Content>
        </Card.Root>
      </div>
      <div class="col-xs-2"></div>
    </div>
  </fieldset>
</form>
{/snippet}
{#snippet step2View()}
<div class="flex flex-col items-start justify-start gap-4 py-4">
  <div class="inline-flex items-center gap-2 font-medium text-lg">
    <fieldset>
      <legend><span class="fa fa-rocket"></span> API properties</legend>
      <div class="control-group">
        <label class="control-label required-pf" for="name">API Name &amp; Version</label>
        <div class="controls row">
          <div class="col-xs-6">
            <input type="text" placeholder="eg. Order API" id="name" name="name" class="form-control" size="20" required/>
          </div>
          <div class="input-group col-xs-2">
            <span class="input-group-addon">v.</span>
            <input type="text" placeholder="1.0" id="version" name="version" class="form-control" required/>
          </div>
        </div>
        <p class="text-sm text-muted-foreground">The name and version of the API to create (should be unique).</p>
      </div>
      <div class="control-group">
        <label class="control-label required-pf" for="resource">Resource</label>
        <div class="controls">
          <input type="text" placeholder="eg. order" id="resource" name="resource" class="form-control" required/>
          <p class="text-sm text-muted-foreground">The resource this API will expose (will be used for CRUD or Publish API operations).</p>
        </div>
      </div>
    </fieldset>
  </div>
</div>    
{/snippet}
{#snippet step3View()}
<div class="flex flex-col items-start justify-start gap-4 py-4">
  <div class="inline-flex items-center gap-2 font-medium text-lg">
    <fieldset>
      <legend><span class="fa fa-rocket"></span> API reference resource</legend>
      <div class="control-group">
        <label class="control-label" for="referencePayload">JSON Reference Payload</label>
        <div class="controls">
          <textarea class="form-control" rows="10" id="referencePayload" name="referencePayload">
          </textarea>
          <p class="text-sm text-muted-foreground">A JSON payload that will be used as first and reference resource of this API</p>
        </div>
      </div>
    </fieldset>
  </div>
</div>
{/snippet}
{#snippet step4View()}
  <h3>Step 4</h3>
{/snippet}

{#snippet step1Review()}
<form class="form">
  <div class="wizard-pf-review-item">
    <span class="wizard-pf-review-item-label">API type:</span>
    <span class="wizard-pf-review-item-value">{ apiType }</span>
  </div>
</form>
{/snippet}
{#snippet step2Review()}
<form class="form">
  <div class="wizard-pf-review-item">
    <span class="wizard-pf-review-item-label">API name:</span>
    <span class="wizard-pf-review-item-value">{ api.name }</span>
  </div>
  <div class="wizard-pf-review-item">
    <span class="wizard-pf-review-item-label">API version:</span>
    <span class="wizard-pf-review-item-value">{ api.version }</span>
  </div>
  <div class="wizard-pf-review-item">
    <span class="wizard-pf-review-item-label">API resource:</span>
    <span class="wizard-pf-review-item-value">{ api.resource }</span>
  </div>
</form>
{/snippet}
{#snippet step3Review()}
<form class="form">
  <div class="wizard-pf-review-item">
    <span class="wizard-pf-review-item-label">JSON reference payload:</span>
    <span class="wizard-pf-review-item-value"><code>{ api.referencePayload }</code></span>
  </div>
</form>
{/snippet}

<Wizard2 isOpen={isOpen} wizardConfig={wizardConfig}
    stepConfigs={stepConfigs} 
    stepViews={[step1View, step2View, step3View, step4View]} 
    stepReviews={[step1Review, step2Review, step3Review]}
    onnext={nextClicked}
    onstepchange={stepChanged}
    oncancel={cancel}>
</Wizard2>