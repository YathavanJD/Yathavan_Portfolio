/** Tiny decoupled "open project details" channel (cards, showcase and anything else can call it). */
export const OPEN_PROJECT_EVENT = "open-project-detail";

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: id }));
}
