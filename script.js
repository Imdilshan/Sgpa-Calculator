window.onload = () => {
   if (!localStorage.getItem("seenGuide")) {
      document.getElementById("onboarding").style.display = "flex";
      localStorage.setItem("seenGuide", "true");
   } else {
      document.getElementById("onboarding").style.display = "none";
   }
};

let currentStep = 0;
const steps = document.querySelectorAll(".onboard-step");

function showStep(index) {
   steps.forEach(step => step.classList.remove("active"));
   steps[index].classList.add("active");
}

function nextStep() {
   currentStep++;
   if (currentStep < steps.length) {
      showStep(currentStep);
   } else {
      closeGuide();
   }
}

function closeGuide() {
   document.getElementById("onboarding").style.display = "none";
}

function toggleDarkMode() {
   document.body.classList.toggle('dark-mode');
   localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

function addRow() {
   const row = document.createElement('div');
   row.className = 'row';
   row.innerHTML = `
        <input type="text" placeholder="📘 Subject Name" class="subject-name" />
        <input type="number" placeholder="Credit" class="credit" />
        <select class="grade">
          <option value="">Select Grade</option>
          <option value="10">A+</option><option value="9">A</option>
          <option value="8">B+</option><option value="7">B</option>
          <option value="6">C+</option><option value="5">C</option>
          <option value="4">D</option><option value="0">E/F/I</option>
        </select>
        <button class="delete-btn" onclick="removeRow(this)">🗑️</button>`;
   document.getElementById('subjectInputs').appendChild(row);
}

function addSemester() {
   const sem = document.createElement('div');
   sem.className = 'semester';
   sem.innerHTML = `
        <input type="number" placeholder="SGPA" class="sgpa" step="0.01" />
        <input type="number" placeholder="Total Credits" class="total-credit" />
        <button class="delete-btn" onclick="removeRow(this)">🗑️</button>`;
   document.getElementById('cgpaInputs').appendChild(sem);
}

function removeRow(btn) {
   btn.parentElement.remove();
}

function calculateSGPA() {
   const grades = document.querySelectorAll('.grade');
   const credits = document.querySelectorAll('.credit');
   let totalPoints = 0,
      totalCredits = 0;
   grades.forEach((g, i) => {
      const gp = parseFloat(g.value);
      const cr = parseFloat(credits[i].value);
      if (!isNaN(gp) && !isNaN(cr)) {
         totalPoints += gp * cr;
         totalCredits += cr;
      }
   });
   const display = document.getElementById('sgpaResult');
   const username = document.getElementById('username').value.trim();
   if (totalCredits === 0) {
      display.innerHTML = `<p>Please enter valid subject data.</p>`;
   } else {
      const sgpa = (totalPoints / totalCredits).toFixed(2);
      display.innerHTML = `<h3>${username ? "Hello, " + username + "! " : ""}🎯 Your SGPA: ${sgpa}</h3>`;
   }
}

function calculateCGPA() {
   const sgpas = document.querySelectorAll('.sgpa');
   const credits = document.querySelectorAll('.total-credit');
   let tP = 0,
      tC = 0;
   sgpas.forEach((s, i) => {
      const sg = parseFloat(s.value);
      const cr = parseFloat(credits[i].value);
      if (!isNaN(sg) && !isNaN(cr)) {
         tP += sg * cr;
         tC += cr;
      }
   });
   const display = document.getElementById('cgpaResult');
   const username = document.getElementById('username').value.trim();
   if (tC === 0) {
      display.innerHTML = `<p>Please enter valid semester data.</p>`;
   } else {
      const cgpa = (tP / tC).toFixed(2);
      display.innerHTML = `<h3>${username ? "Hello, " + username + "! " : ""}📊 Your CGPA: ${cgpa}</h3>`;
   }
}

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
         .then(reg => console.log('SW registered', reg))
         .catch(err => console.error('SW failed', err));
   });
}
