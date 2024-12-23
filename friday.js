const btn = document.querySelector('.talk');
const content = document.querySelector('.content');



// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);

//     text_speak.rate = 1;
//     text_speak.volume = 1;
//     text_speak.pitch = 1;
//     // text_speak.voice=voice[4]

//     window.speechSynthesis.speak(text_speak);
// }



// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);

//     text_speak.rate = 1;   // Speed of speech
//     text_speak.volume = 2; // Volume level
//     text_speak.pitch = 2;  // Pitch level

//     // Fetch voices and set a female voice once they are loaded
//     const loadVoices = () => {
//         const voices = window.speechSynthesis.getVoices();
        
//         // Brute-force search for a female voice
//         const femaleVoice = voices.find(voice =>
//             voice.name.toLowerCase().includes('female') ||
//             voice.name.toLowerCase().includes('woman') ||
//             voice.name.toLowerCase().includes('girl') ||
//             voice.name.toLowerCase().includes('samantha') || // Common female voice name
//             voice.name.toLowerCase().includes('victoria') || // Another common female voice
//             voice.name.toLowerCase().includes('karen') || // Commonly available on macOS
//             voice.lang.toLowerCase().startsWith('en') && voice.gender === 'female' // Language and gender check
//         );

//         // Assign the female voice if found
//         if (femaleVoice) {
//             text_speak.voice = femaleVoice;
//         } else if (voices.length > 0) {
//             // Fallback to the first available voice
//             text_speak.voice = voices[4];
//         }
    
//         // Speak the text
//         window.speechSynthesis.speak(text_speak);
//     };

//     // Ensure voices are loaded before attempting to select one
//     if (window.speechSynthesis.getVoices().length !== 0) {
//         loadVoices();
//     } else {
//         window.speechSynthesis.onvoiceschanged = loadVoices;
//     }
// }

// // // Test the function with a greeting message
// // speak('Hello! I am your assistant.');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;   // Speed of speech
    text_speak.volume = 1; // Volume level
    text_speak.pitch = 1;  // Pitch level

    // Fetch the list of available voices asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a female voice
        const femaleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('google uk english female') ||
            voice.name.toLowerCase().includes('us english female') ||
            voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
        );

        // If a female voice is found, assign it
        if (femaleVoice) {
            text_speak.voice = femaleVoice;
        } else if (voices.length > 0) {
            // Fallback to the first voice if no female voice is found
            text_speak.voice = voices[4];
        }

        // Speak the text
        window.speechSynthesis.speak(text_speak);
    };

    // Trigger voice loading
    window.speechSynthesis.getVoices(); // This helps in some browsers to trigger loading of voices
}

// Call the speak function with a test message
// speak('Hello! I am your assistant.');




function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening BOSS...");
    }
}

window.addEventListener('load', () => {
    speak("HELLO... I AM  FRIDAY...GOOD TO SEE YOU");
    wishMe();
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");}
       else if (message.includes('how are you')|| message.includes('how you doing')){
            speak("I am Awesome... How ARE YOU")
        }
     else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}