let isPaid = false;
let selectedThemeName = 'theme-blue';

const cashfree = Cashfree({
    mode: "sandbox"
});

function navigateTo(pageId) {
    document.querySelectorAll('.app-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Interactive Multi-Theme Selection Rules Injection Engine
function selectTheme(themeName, accentHex, baseHex) {
    selectedThemeName = themeName;
    const root = document.documentElement;
    
    // Inject custom properties live into wrapper scope
    root.style.setProperty('--theme-accent', accentHex);
    root.style.setProperty('--theme-base', baseHex);
    
    // Handle extreme visibility control (Black & White text determination engine)
    // Darker tones get bright text headings inside banner structures
    if (themeName === 'theme-charcoal' || themeName === 'theme-blue' || themeName === 'theme-burgundy' || themeName === 'theme-purple') {
        root.style.setProperty('--theme-text-on-accent', '#ffffff');
    } else {
        root.style.setProperty('--theme-text-on-accent', '#000000');
    }
    
    // Base surface text targets clear crisp black tone representation
    root.style.setProperty('--theme-text-on-base', '#000000');

    // Proceed straight down to working form space layout
    navigateTo('page-builder');
}

async function payNow() {
    alert("Sandbox test bypass: Simulating standard checkout payment flow and unlocking the premium resume preview.");
    unlockResume();
}

function unlockResume() {
    isPaid = true;
    document.getElementById('resume-wrapper').classList.remove('locked-preview');
    document.getElementById('pay-button').style.display = 'none';
    document.getElementById('print-button').style.display = 'block';
}

function previewPhoto(event) {
    const input = event.target;
    const viewPhoto = document.getElementById('view-photo');
    const placeholder = document.getElementById('photo-placeholder');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            viewPhoto.src = e.target.result;
            viewPhoto.style.display = 'block';
            placeholder.style.display = 'none';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Live Interactive Layout Synchronizer Setup
function updateResume() {
    document.getElementById('view-name').innerText = document.getElementById('input-name').value.toUpperCase() || 'FARDIN SIKDAR';
    document.getElementById('view-phone').innerText = document.getElementById('input-phone').value || '6000285447';
    document.getElementById('view-email').innerText = document.getElementById('input-email').value || 'fardinsikdar@gmail.com';
    
    const villa = document.getElementById('input-villa').value || 'H No: 99, Kirkira';
    const po = document.getElementById('input-po').value ? ', PO: ' + document.getElementById('input-po').value : '';
    const ps = document.getElementById('input-ps').value ? ', PS: ' + document.getElementById('input-ps').value : '';
    const dist = document.getElementById('input-dist').value || 'Barpeta';
    const state = document.getElementById('input-state').value || 'Assam';
    const pin = document.getElementById('input-pin').value || '781375';
    document.getElementById('view-address').innerText = `${villa}${po}${ps}, Dist: ${dist} (${state}) ${pin}`;

    document.getElementById('view-objective').innerText = document.getElementById('input-objective').value || 'Obtain a responsible position in a organization with the best capabilities, skills and knowledge.';

    const eduRows = document.querySelectorAll('#education-fields .dynamic-row');
    let eduHTML = '';
    eduRows.forEach(row => {
        const degree = row.querySelector('.edu-degree').value;
        const school = row.querySelector('.edu-school').value;
        const year = row.querySelector('.edu-year').value;
        const grade = row.querySelector('.edu-grade').value;
        if(degree || school) {
            eduHTML += `<tr><td><strong>${degree}</strong></td><td>${school}</td><td>${year}</td><td>${grade || 'N/A'}</td></tr>`;
        }
    });
    document.getElementById('view-education').innerHTML = eduHTML || 
        `<tr><td><strong>BA</strong></td><td>Harendra Chitra College</td><td>-</td><td>-</td></tr>
         <tr><td><strong>12th</strong></td><td>Ajmal College of Arts And Science</td><td>-</td><td>-</td></tr>
         <tr><td><strong>10th</strong></td><td>Jawahar Navodaya Vidyalaya (Barpeta)</td><td>-</td><td>-</td></tr>`;

    const skillsInput = document.getElementById('input-skills').value;
    const skillsArray = skillsInput ? skillsInput.split(',') : ['Basic Computer Knowledge', 'Typing'];
    let skillsHTML = '';
    skillsArray.forEach(skill => {
        if(skill.trim()) skillsHTML += `<li>${skill.trim()}</li>`;
    });
    document.getElementById('view-skills').innerHTML = skillsHTML;

    const expRows = document.querySelectorAll('#experience-fields .dynamic-row');
    let expHTML = '';
    expRows.forEach(row => {
        const title = row.querySelector('.exp-title').value;
        const company = row.querySelector('.exp-company').value;
        const date = row.querySelector('.exp-date').value;
        if(title || company) {
            expHTML += `<div class="resume-item"><div class="resume-item-header"><span>• ${title}</span><span>(${date})</span></div><div class="resume-item-sub">${company}</div></div>`;
        }
    });
    document.getElementById('view-experience').innerHTML = expHTML || '<div class="resume-item"><div class="resume-item-header"><span>• FA</span><span>(2025)</span></div><div class="resume-item-sub">INDIA 360</div></div>';

    document.getElementById('view-father').innerText = document.getElementById('input-father').value || 'Miran Sikdar';
    document.getElementById('view-dob').innerText = document.getElementById('input-dob').value || '10/08/2002';
    document.getElementById('view-gender').innerText = document.getElementById('input-gender').value || 'Male';
    document.getElementById('view-nationality').innerText = document.getElementById('input-nationality').value || 'Indian';
    document.getElementById('view-martial').innerText = document.getElementById('input-martial').value || 'Unmarried';
    document.getElementById('view-languages').innerText = document.getElementById('input-languages').value || 'English, Hindi, Assamese, Bengali';
}

function addEducation() {
    const container = document.getElementById('education-fields');
    const newRow = document.createElement('div');
    newRow.className = 'dynamic-row';
    newRow.innerHTML = `
        <div class="form-group"><input type="text" class="edu-degree" placeholder="Degree / Course" oninput="updateResume()"></div>
        <div class="form-group"><input type="text" class="edu-school" placeholder="School / Board / University" oninput="updateResume()"></div>
        <div class="grid-2">
            <div class="form-group"><input type="text" class="edu-year" placeholder="Passing Year" oninput="updateResume()"></div>
            <div class="form-group"><input type="text" class="edu-grade" placeholder="Percentage" oninput="updateResume()"></div>
        </div>
    `;
    container.appendChild(newRow);
    updateResume();
}

function addExperience() {
    const container = document.getElementById('experience-fields');
    const newRow = document.createElement('div');
    newRow.className = 'dynamic-row';
    newRow.innerHTML = `
        <div class="form-group"><input type="text" class="exp-title" placeholder="Designation / Role" oninput="updateResume()"></div>
        <div class="form-group"><input type="text" class="exp-company" placeholder="Organization Name" oninput="updateResume()"></div>
        <div class="form-group"><input type="text" class="exp-date" placeholder="Year" oninput="updateResume()"></div>
    `;
    container.appendChild(newRow);
    updateResume();
}

// Run layout initialization on page load
updateResume();