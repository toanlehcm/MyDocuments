# Resolve Copilot signup eligibility after organization-provided seat was removed

The likely cause is that your account is still associated with an organization-managed Copilot seat — here’s what to check and the official steps to take.

## Steps to resolve eligibility so you can subscribe to an individual Copilot plan

1. Confirm current Copilot assignment and plan status
- Go to your Copilot settings at https://github.com/settings/copilot/features (opens in a new tab) and to https://github.com/settings/copilot (opens in a new tab) to see whether you still show as assigned to a Copilot plan through an organization. The docs state Copilot seats assigned by an organization will prevent you from using Copilot Free/Pro as an individual and can automatically cancel personal subscriptions if you’re later assigned to a business/enterprise seat. See Managing your GitHub Copilot policies: https://docs.github.com/en/copilot/how-tos/manage-your-account (opens in a new tab) (use the Copilot settings pages linked above).

2. If you still appear assigned to the organization
- The organization owner or admin must remove the Copilot seat assignment from your account. For organization-owned repositories and seats, availability is managed by organization/enterprise admins (see Troubleshooting GitHub Copilot coding agent: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/troubleshoot-coding-agent (opens in a new tab)).

3. If the organization owner already removed the seat but eligibility still blocks signup
- Wait a short time for the change to propagate (billing and seat changes can take effect across GitHub systems). If the block persists after a few hours, the account may still be recognized as eligible for an organizational seat.

4. How to proceed if you cannot make the change yourself
- Because organization-admin actions are required to fully remove an assigned seat, ask the Valley-Holdings owner/admin to confirm they removed the Copilot seat from your account. They should verify in their organization’s Copilot seat assignments that your account is no longer listed.

5. If you cannot get the organization admin to act or the block remains after they confirm removal
- Open a support ticket. Include the exact account username and state that you were removed from the organization’s Copilot seat but are still blocked from subscribing individually. GitHub Support can investigate account assignment state. Note: GitHub Support cannot reassign seats on behalf of an organization; they can investigate and advise next steps. Relevant docs: About billing for individual GitHub Copilot plans — https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals (opens in a new tab)

## Important notes from GitHub docs

- If you are assigned a Copilot seat through an organization or enterprise, your personal Copilot plan will be automatically canceled and you’ll be billed according to your organization’s policies. If that assignment is removed, you should then be able to subscribe individually (docs: https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals (opens in a new tab)).
- If you were previously provided Copilot via an organization, make sure there isn’t an active organizational assignment still attached to your account before attempting to subscribe.

If you want GitHub Support to investigate the account state after the org confirms removal, please submit the support ticket through the portal (you’re already in the ticket flow). In that ticket, mention that Valley-Holdings removed your Copilot assignment and that you still see the "not eligible" message when attempting to subscribe — Support can then inspect assignment/billing state and advise.

## Relevant documentation

- Managing Copilot settings (features page): https://github.com/settings/copilot/features (opens in a new tab)
- Troubleshooting Copilot coding agent and assignment details: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/troubleshoot-coding-agent (opens in a new tab)
- Billing for individual Copilot plans: https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals (opens in a new tab)

If you’d like, proceed to submit the ticket now so Support can review your account and organization assignment state.

## AI generated this answer, it may not be perfect. For information on how we use your data see the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).