
let activeAddSubMode = 'add';

document.addEventListener('DOMContentLoaded', () => {
    // Set initial dates for date calculator
    const now = new Date();
    const past = new Date(now.getFullYear(), 0, 1);

    const formatDateForInput = (d) => {
        const pad = (n) => n < 10 ? '0' + n : n;
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    const startEl = document.getElementById('date-start');
    const endEl = document.getElementById('date-end');
    if (startEl && endEl) {
        startEl.value = formatDateForInput(past);
        endEl.value = formatDateForInput(now);
    }

    // Run initial calculations
    calculateDuration();
    calculateAddSub();
    calculatePayroll();
    calculateDateDiff();

    // Attach event listeners for real-time recalculation in payroll
    document.querySelectorAll('.pay-input, #pay-rate, #ot-rate, #ot-rule').forEach(el => {
        el.addEventListener('input', calculatePayroll);
    });
});

/* Tab Switcher Logic */
function switchTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm', 'ring-1', 'ring-slate-200');
        btn.classList.add('text-slate-600');
        btn.setAttribute('aria-selected', 'false');
    });

    const activePanel = document.getElementById(`tab-${tabName}`);
    const activeBtn = document.getElementById(`tab-btn-${tabName}`);

    if (activePanel && activeBtn) {
        activePanel.classList.remove('hidden');
        activeBtn.classList.add('bg-white', 'text-indigo-600', 'shadow-sm', 'ring-1', 'ring-slate-200');
        activeBtn.classList.remove('text-slate-600');
        activeBtn.setAttribute('aria-selected', 'true');
    }
}

/* Mode Toggle for Add / Subtract */
function setAddSubMode(mode) {
    activeAddSubMode = mode;
    const addBtn = document.getElementById('addsub-mode-add');
    const subBtn = document.getElementById('addsub-mode-sub');
    const label = document.getElementById('as-op-label');

    if (mode === 'add') {
        addBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition bg-white text-indigo-600 shadow-sm";
        subBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition text-slate-600 hover:text-slate-900";
        if (label) label.innerText = "Time Amount to Add";
    } else {
        subBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition bg-white text-indigo-600 shadow-sm";
        addBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition text-slate-600 hover:text-slate-900";
        if (label) label.innerText = "Time Amount to Subtract";
    }
    calculateAddSub();
}

/* Helper: Parse Time String to Minutes from Midnight */
function parseTimeToMinutes(timeStr, ampmStr) {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(':');
    let h = parseInt(parts[0], 10) || 0;
    let m = parseInt(parts[1], 10) || 0;

    if (ampmStr === 'AM') {
        if (h === 12) h = 0;
    } else if (ampmStr === 'PM') {
        if (h < 12) h += 12;
    }
    return (h * 60) + m;
}

let activeAddSubMode = 'add';

        document.addEventListener('DOMContentLoaded', () => {
            // Set initial dates for date calculator
            const now = new Date();
            const past = new Date(now.getFullYear(), 0, 1);
            
            const formatDateForInput = (d) => {
                const pad = (n) => n < 10 ? '0' + n : n;
                return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
            };

            const startEl = document.getElementById('date-start');
            const endEl = document.getElementById('date-end');
            if (startEl && endEl) {
                startEl.value = formatDateForInput(past);
                endEl.value = formatDateForInput(now);
            }

            // Run initial calculations
            calculateDuration();
            calculateAddSub();
            calculatePayroll();
            calculateDateDiff();

            // Attach event listeners for real-time recalculation in payroll
            document.querySelectorAll('.pay-input, #pay-rate, #ot-rate, #ot-rule').forEach(el => {
                el.addEventListener('input', calculatePayroll);
            });
        });

        /* Tab Switcher Logic */
        function switchTab(tabName) {
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm', 'ring-1', 'ring-slate-200');
                btn.classList.add('text-slate-600');
                btn.setAttribute('aria-selected', 'false');
            });

            const activePanel = document.getElementById(`tab-${tabName}`);
            const activeBtn = document.getElementById(`tab-btn-${tabName}`);

            if (activePanel && activeBtn) {
                activePanel.classList.remove('hidden');
                activeBtn.classList.add('bg-white', 'text-indigo-600', 'shadow-sm', 'ring-1', 'ring-slate-200');
                activeBtn.classList.remove('text-slate-600');
                activeBtn.setAttribute('aria-selected', 'true');
            }
        }

        /* Mode Toggle for Add / Subtract */
        function setAddSubMode(mode) {
            activeAddSubMode = mode;
            const addBtn = document.getElementById('addsub-mode-add');
            const subBtn = document.getElementById('addsub-mode-sub');
            const label = document.getElementById('as-op-label');

            if (mode === 'add') {
                addBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition bg-white text-indigo-600 shadow-sm";
                subBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition text-slate-600 hover:text-slate-900";
                if(label) label.innerText = "Time Amount to Add";
            } else {
                subBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition bg-white text-indigo-600 shadow-sm";
                addBtn.className = "flex-1 py-2 text-xs font-bold uppercase rounded-lg transition text-slate-600 hover:text-slate-900";
                if(label) label.innerText = "Time Amount to Subtract";
            }
            calculateAddSub();
        }

        /* Helper: Parse Time String to Minutes from Midnight */
        function parseTimeToMinutes(timeStr, ampmStr) {
            if (!timeStr) return 0;
            const parts = timeStr.trim().split(':');
            let h = parseInt(parts[0], 10) || 0;
            let m = parseInt(parts[1], 10) || 0;

            if (ampmStr === 'AM') {
                if (h === 12) h = 0;
            } else if (ampmStr === 'PM') {
                if (h < 12) h += 12;
            }
            return (h * 60) + m;
        }

        /* Tab 1: Time Duration Calculation */
        function calculateDuration() {
            const startVal = document.getElementById('dur-start-time').value;
            const startAmpm = document.getElementById('dur-start-ampm').value;
            const endVal = document.getElementById('dur-end-time').value;
            const endAmpm = document.getElementById('dur-end-ampm').value;
            const breakMins = parseInt(document.getElementById('dur-break-mins').value, 10) || 0;

            let startMins = parseTimeToMinutes(startVal, startAmpm);
            let endMins = parseTimeToMinutes(endVal, endAmpm);

            // Overnight adjustment
            if (endMins < startMins) {
                endMins += 24 * 60;
            }

            let diffMins = endMins - startMins - breakMins;
            if (diffMins < 0) diffMins = 0;

            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            const totalSecs = diffMins * 60;
            const decimalHours = (diffMins / 60).toFixed(2);

            document.getElementById('dur-main-text').innerText = `${hours} hours ${mins} minutes`;
            document.getElementById('dur-res-hours').innerText = `${hours}h`;
            document.getElementById('dur-res-mins').innerText = `${diffMins}m`;
            document.getElementById('dur-res-secs').innerText = `${totalSecs.toLocaleString()}s`;
            document.getElementById('dur-res-decimal').innerText = `${decimalHours} hrs`;
        }

        function resetDuration() {
            document.getElementById('dur-start-time').value = "09:00";
            document.getElementById('dur-start-ampm').value = "AM";
            document.getElementById('dur-end-time').value = "05:30";
            document.getElementById('dur-end-ampm').value = "PM";
            document.getElementById('dur-break-mins').value = "30";
            calculateDuration();
        }

/* Tab 2: Add or Subtract Time Calculation */
function calculateAddSub() {
    const baseH = parseInt(document.getElementById('as-base-h').value, 10) || 0;
    const baseM = parseInt(document.getElementById('as-base-m').value, 10) || 0;
    const baseS = parseInt(document.getElementById('as-base-s').value, 10) || 0;

    const valH = parseInt(document.getElementById('as-val-h').value, 10) || 0;
    const valM = parseInt(document.getElementById('as-val-m').value, 10) || 0;
    const valS = parseInt(document.getElementById('as-val-s').value, 10) || 0;

    let baseTotalSecs = (baseH * 3600) + (baseM * 60) + baseS;
    let valTotalSecs = (valH * 3600) + (valM * 60) + valS;

    let resultSecs = (activeAddSubMode === 'add')
        ? baseTotalSecs + valTotalSecs
        : baseTotalSecs - valTotalSecs;

    if (resultSecs < 0) resultSecs = 0;

    const resH = Math.floor(resultSecs / 3600);
    const remSecs = resultSecs % 3600;
    const resM = Math.floor(remSecs / 60);
    const resS = remSecs % 60;

    const decimalHrs = (resultSecs / 3600).toFixed(2);

    document.getElementById('as-result-text').innerText = `${resH} hours ${resM} minutes ${resS} seconds`;
    document.getElementById('as-result-sub').innerText = `${decimalHrs} decimal hours | ${resultSecs.toLocaleString()} total seconds`;
}

function resetAddSub() {
    document.getElementById('as-base-h').value = "10";
    document.getElementById('as-base-m').value = "30";
    document.getElementById('as-base-s').value = "0";
    document.getElementById('as-val-h').value = "2";
    document.getElementById('as-val-m').value = "45";
    document.getElementById('as-val-s').value = "15";
    setAddSubMode('add');
}

/* Tab 3: Work Hours & Payroll Calculation */
function calculatePayroll() {
    const rate = parseFloat(document.getElementById('pay-rate').value) || 0;
    const otMult = parseFloat(document.getElementById('ot-rate').value) || 1.5;
    const otRule = document.getElementById('ot-rule').value;

    let totalWorkedMins = 0;
    let dailyHoursArr = [];

    for (let i = 1; i <= 5; i++) {
        const startVal = document.getElementById(`p-start-${i}`).value;
        const endVal = document.getElementById(`p-end-${i}`).value;
        const breakMins = parseInt(document.getElementById(`p-break-${i}`).value, 10) || 0;

        if (startVal && endVal) {
            let sMins = parseTimeToMinutes(startVal, '24');
            let eMins = parseTimeToMinutes(endVal, '24');

            if (eMins < sMins) eMins += 24 * 60;

            let netMins = eMins - sMins - breakMins;
            if (netMins < 0) netMins = 0;

            let netHours = netMins / 60;
            dailyHoursArr.push(netHours);
            totalWorkedMins += netMins;

            document.getElementById(`p-row-tot-${i}`).innerText = `${netHours.toFixed(2)} hrs`;
        } else {
            dailyHoursArr.push(0);
            document.getElementById(`p-row-tot-${i}`).innerText = `0.00 hrs`;
        }
    }

    const totalHours = totalWorkedMins / 60;
    let regularHours = 0;
    let overtimeHours = 0;

    if (otRule === 'daily8') {
        dailyHoursArr.forEach(h => {
            if (h > 8) {
                regularHours += 8;
                overtimeHours += (h - 8);
            } else {
                regularHours += h;
            }
        });
    } else {
        // weekly40
        if (totalHours > 40) {
            regularHours = 40;
            overtimeHours = totalHours - 40;
        } else {
            regularHours = totalHours;
            overtimeHours = 0;
        }
    }

    const grossPay = (regularHours * rate) + (overtimeHours * rate * otMult);

    document.getElementById('tot-pay-hours').innerText = `${totalHours.toFixed(2)} h`;
    document.getElementById('tot-reg-hours').innerText = `${regularHours.toFixed(2)} h`;
    document.getElementById('tot-ot-hours').innerText = `${overtimeHours.toFixed(2)} h`;
    document.getElementById('tot-gross-pay').innerText = `$${grossPay.toFixed(2)}`;
}

function resetPayroll() {
    document.getElementById('pay-rate').value = "25.00";
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`p-start-${i}`).value = "09:00";
        document.getElementById(`p-end-${i}`).value = "17:00";
        document.getElementById(`p-break-${i}`).value = "30";
    }
    calculatePayroll();
}

/* Tab 4: Date & Duration Calculation */
function calculateDateDiff() {
    const startVal = document.getElementById('date-start').value;
    const endVal = document.getElementById('date-end').value;

    if (!startVal || !endVal) return;

    let d1 = new Date(startVal);
    let d2 = new Date(endVal);

    if (d1 > d2) {
        let temp = d1;
        d1 = d2;
        d2 = temp;
    }

    let diffMs = d2 - d1;
    let diffSecs = Math.floor(diffMs / 1000);
    let diffMins = Math.floor(diffSecs / 60);
    let diffHours = Math.floor(diffMins / 60);
    let diffDays = Math.floor(diffHours / 24);

    // Chronological year, month, day difference
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();
    let hours = d2.getHours() - d1.getHours();
    let mins = d2.getMinutes() - d1.getMinutes();

    if (mins < 0) {
        mins += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        let prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    let resultString = [];
    if (years > 0) resultString.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0) resultString.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    if (days > 0) resultString.push(`${days} ${days === 1 ? 'day' : 'days'}`);
    if (hours > 0) resultString.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    if (mins > 0) resultString.push(`${mins} ${mins === 1 ? 'minute' : 'minutes'}`);

    document.getElementById('date-res-main').innerText = resultString.length > 0 ? resultString.join(', ') : '0 days, 0 hours';

    const subContainer = document.getElementById('date-res-sub');
    subContainer.innerHTML = `
                <div class="p-2 bg-white rounded-lg border border-indigo-100"><strong>Total Days:</strong> ${diffDays.toLocaleString()}</div>
                <div class="p-2 bg-white rounded-lg border border-indigo-100"><strong>Total Hours:</strong> ${diffHours.toLocaleString()}</div>
                <div class="p-2 bg-white rounded-lg border border-indigo-100"><strong>Total Minutes:</strong> ${diffMins.toLocaleString()}</div>
            `;
}

function resetDateDiff() {
    const now = new Date();
    const past = new Date(now.getFullYear(), 0, 1);

    const formatDateForInput = (d) => {
        const pad = (n) => n < 10 ? '0' + n : n;
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    document.getElementById('date-start').value = formatDateForInput(past);
    document.getElementById('date-end').value = formatDateForInput(now);
    calculateDateDiff();
}

/* FAQ Accordion Toggle */
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(`${id}-icon`);

    if (content && icon) {
        const isOpen = content.classList.contains('open');
        if (isOpen) {
            content.classList.remove('open');
            icon.classList.remove('rotate-180');
        } else {
            content.classList.add('open');
            icon.classList.add('rotate-180');
        }
    }
}
