export function applyMagneticMotion(element: HTMLElement | null) {
  if (!element) return;

  const handlePointerMove = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };

  const handlePointerLeave = () => {
    element.style.transform = "translate(0, 0)";
  };

  element.addEventListener("pointermove", handlePointerMove);
  element.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    element.removeEventListener("pointermove", handlePointerMove);
    element.removeEventListener("pointerleave", handlePointerLeave);
  };
}
