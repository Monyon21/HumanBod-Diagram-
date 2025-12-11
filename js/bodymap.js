// Attach click listeners to SVG body parts
document.addEventListener("DOMContentLoaded", () => {
  const parts = [
    {id:'head_face', key:'head_face'},
    {id:'eye', key:'eye'},
    {id:'ears', key:'ears'},
    {id:'arms_hands', key:'arms_hands'},
    {id:'legs_feet', key:'legs_feet'}
  ];

  parts.forEach(part => {
    const el = document.getElementById(part.id);
    if (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const info = getBodyInfo(part.key);
        document.getElementById("partName").textContent = info.name;
        document.getElementById("anatomy").innerHTML = `<strong>Anatomy:</strong> ${info.anatomy}`;
        document.getElementById("function").innerHTML = `<strong>Function:</strong> ${info.function}`;
        document.getElementById("health").innerHTML = `<strong>Health tips:</strong> ${info.health}`;
        // brief visual feedback
        flashPart(el);
      });
    }
  });
});

function flashPart(svgEl){
  const original = svgEl.style.fill;
  svgEl.style.fill = '#9ef0da';
  setTimeout(()=>{ svgEl.style.fill = original; }, 350);
}
