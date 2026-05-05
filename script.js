// Patalix AI - Hidden Logic by a 12-year-old Prodigy
const API_KEY = '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';

let tokens = 3;
let selectedVoice = 'auto'; // Default setting

const tokenEl = document.getElementById('tokens');
const output = document.getElementById('chat-output');
const input = document.getElementById('user-input');
const send = document.getElementById('send-btn');

if (tokenEl) tokenEl.innerText = tokens;

send.onclick = async () => {
    const text = input.value;
    if (!text) return;

    if (tokens <= 0) {
        alert("Tokens over! Watch an ad for Emergency Mode.");
        return;
    }

    tokens--;
    if (tokenEl) tokenEl.innerText = tokens;

    output.innerHTML += `<div style="text-align:right; margin:10px; color:#1a73e8; background:#e3f2fd; padding:8px; border-radius:10px; display:inline-block; align-self:flex-end;"><b>You:</b> ${text}</div>`;
    input.value = '';

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3-8b-instruct:free",
                "messages": [{"role": "user", "content": text}]
            })
        });

        const data = await res.json();
        const reply = data.choices[0].message.content;

        output.innerHTML += `<div style="text-align:left; margin:10px; background:#f1f3f4; padding:10px; border-radius:10px; width: fit-content;"><b>Patalix:</b> ${reply}</div>`;
        output.scrollTop = output.scrollHeight;

    } catch (e) {
        output.innerHTML += `<div style="color:red; margin:10px;">Error: Brain disconnected. Check connection.</div>`;
    }
};

