"use strict";
var BackgroundTheme;
(function (BackgroundTheme) {
    BackgroundTheme["White"] = "bg-white";
    BackgroundTheme["Sky"] = "bg-custom-blue";
    BackgroundTheme["Beige"] = "bg-custom-beige";
    BackgroundTheme["Pink"] = "bg-custom-pink";
    BackgroundTheme["Mint"] = "bg-custom-mint";
})(BackgroundTheme || (BackgroundTheme = {}));
function getExperienceText(hobby, years) {
    if (years > 5)
        return `Wow, you're a real expert in ${hobby}!`;
    if (years >= 1)
        return `Great, you already have experience in ${hobby}.`;
    return "Everything lies ahead! Starting a new hobby is exciting.";
}
function createGreeting(name, age, hobby, experience) {
    const expText = getExperienceText(hobby, experience);
    return `Hello, <span class="font-bold text-purple-700">${name}</span>! 
          You're ${age} years old. 
          Your hobby — <span class="italic">${hobby}</span>. 
          ${expText}`;
}
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("greetBtn");
    const resultDiv = document.getElementById("result");
    const select = document.getElementById("colorSelect");
    const inputs = {
        name: document.getElementById("name"),
        age: document.getElementById("age"),
        hobby: document.getElementById("hobby"),
        experience: document.getElementById("experience"),
    };
    function validateForm() {
        const name = inputs.name.value.trim();
        const age = inputs.age.value;
        const hobby = inputs.hobby.value.trim();
        const experience = inputs.experience.value;
        return name !== "" && age !== "" && hobby !== "" && experience !== "";
    }
    function updateButtonState() {
        if (validateForm()) {
            btn.disabled = false;
            btn.classList.remove("opacity-60", "cursor-not-allowed");
            btn.classList.add("hover:scale-105", "from-purple-600", "to-blue-600");
        }
        else {
            btn.disabled = true;
            btn.classList.add("opacity-60", "cursor-not-allowed");
            btn.classList.remove("hover:scale-105");
        }
    }
    btn.disabled = true;
    btn.classList.add("opacity-60", "cursor-not-allowed");
    Object.values(inputs).forEach((input) => {
        input.addEventListener("input", updateButtonState);
    });
    select.addEventListener("change", () => {
        document.body.classList.remove("bg-gray-50", ...Object.values(BackgroundTheme));
        document.body.classList.add(select.value);
    });
    document.body.classList.add("bg-white");
    btn.addEventListener("click", () => {
        if (!validateForm())
            return;
        const name = inputs.name.value.trim();
        const age = Number(inputs.age.value);
        const hobby = inputs.hobby.value.trim();
        const experience = Number(inputs.experience.value);
        resultDiv.innerHTML = createGreeting(name, age, hobby, experience);
        let list = `
      <div class="mt-8 pt-6 border-t border-gray-300">
        <p class="text-sm font-medium text-gray-600 mb-3">Available background themes:</p>
        <ul class="space-y-2">`;
        for (let key in BackgroundTheme) {
            if (isNaN(Number(key))) {
                const className = BackgroundTheme[key];
                list += `
          <li class="flex items-center gap-3 text-sm">
            <span class="w-7 h-7 rounded-lg border-2 border-gray-300 ${className}"></span>
            <span class="text-gray-700">${key}</span>
          </li>`;
            }
        }
        list += `</ul></div>`;
        resultDiv.innerHTML += list;
    });
    updateButtonState();
});
