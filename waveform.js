export function createWaveformVisualization(sampleIdx) {
    const samplesTable = document.getElementById('audio-samples-table');
    // Create a new row
    const row = document.createElement('tr');
    // Create two cells for the waveforms
    const waveform1 = getSingleWaveform(getAudioOptions('noisy-rev'));
    const waveform2 = getSingleWaveform(getAudioOptions('rev')); 
    // Append the waveforms to the row
    row.appendChild(waveform1);
    row.appendChild(waveform2);
    // Append the row to the table
    samplesTable.appendChild(row);
}


function getAudioOptions(type) {
    const AUDIO_PATH = `audio/${sampleIdx.toString()}`;
    // const AUDIO_PATH = `audio/${type}/${sampleIdx.toString()}`;
    const audioOptions = {
        'Observed': `${AUDIO_PATH}/observed.wav`,
        'Clean': `${AUDIO_PATH}/clean.wav`,
        'Enhanced (simultaneous)': `${AUDIO_PATH}/enhanced_simult.wav`,
        'Enhanced (two-steps)': `${AUDIO_PATH}/enhanced_two.wav`,
    };
    
    return audioOptions
}


function getSingleWaveform(audioOptions) {
    const waveformContainer = document.createElement('div');
    const wavesurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: 'rgb(98, 0, 234)',
        progressColor: 'rgb(55, 0, 179)',
        url: audioOptions['Observed'],
        mediaControls: true,
        // Set a bar width
        barWidth: 2,
        // Optionally, specify the spacing between bars
        barGap: 1,
        // And the bar radius
        barRadius: 2,
      })
    const optionsContainer = document.createElement('div');

    Object.keys(audioOptions).forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'waveform-button';
        optionsContainer.appendChild(button);
    });

    const buttons = optionsContainer.querySelectorAll('.waveform-button');

    buttons[0].classList.add('active');
    wavesurfer.load(audioOptions[buttons[0].textContent]);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Load the corresponding audio file
            wavesurfer.load(audioOptions[button.textContent]);
        });
    });
      
    
    waveformContainer.appendChild(optionsContainer);
    const cell = document.createElement('td');
    cell.appendChild(waveformContainer)
    return cell;
}