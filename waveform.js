export function createWaveformVisualization(sampleIdx) {
    const AUDIO_PATH = `audio/${sampleIdx.toString()}`
    const audioOptions = {
        'Observed': `${AUDIO_PATH}/observed.wav`,
        'Clean': `${AUDIO_PATH}/clean.wav`,
        'Enhanced (simultaneous)': `${AUDIO_PATH}/enhanced_simult.wav`,
        'Enhanced (two-steps)': `${AUDIO_PATH}/enhanced_two.wav`,
      };
    
    const samplesDiv = document.getElementById('audio-samples');
    
    const wavesurfer = WaveSurfer.create({
        container: samplesDiv,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        url: audioOptions['Observed'],
        mediaControls: true,
      })

    const optionsContainer = document.createElement('div');
    
    Object.keys(audioOptions).forEach(option => {
        const button = document.createElement('button'); // Create a button for each option
        button.textContent = option;
        button.style.margin = '5px'; // Optional styling for buttons
      
        // Add event listener to load the selected audio when the button is clicked
        button.addEventListener('click', () => {
          wavesurfer.load(audioOptions[option]); // Load the corresponding audio file
        });
      
        optionsContainer.appendChild(button); // Append the button to the options container
      });
      
      
      // Optional: Play/Pause the waveform when clicked
    wavesurfer.on('click', () => {
        wavesurfer.playPause();
      });

    samplesDiv.appendChild(optionsContainer);
}