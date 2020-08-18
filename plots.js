function init() {
  const selector = d3.select('#selDataset');

  d3.json('samples.json').then(data => {
    console.log(data);
    const sampleNames = data.names;
    optionChanged(sampleNames[0]);
    sampleNames.forEach(sample => {
      selector
        .append('option')
        .text(sample)
        .property('value', sample);
    });
  });
}

init();
function buildMetadata(sample) {
    d3.json('samples.json').then(data => {
      const metadata = data.metadata;
      const resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      const result = resultArray[0];
      const PANEL = d3.select('#sample-metadata');
  
      PANEL.html('');
      for (let [key, value] of Object.entries(result)) {
        console.log(key, value);
        PANEL.append('h6').text(`${key.toUpperCase()}: ${value}`);
      }
    });
  }
  
function buildCharts(sample) {
    d3.json('samples.json').then(data => {
      const samples = data.samples;
      const resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      const result = resultArray[0];
  
      const sample_values = result.sample_values;
      const otu_ids = result.otu_ids;
      const otu_labels = result.otu_labels;
      
      console.log(sample_values, otu_ids);
  
      const bar_data = [
        {
          type: 'bar',
          x: sample_values.slice(0, 10),
          y: otu_ids.slice(0, 10).map(spieceid => 'OTU ' + spieceid + ' '),
          orientation: 'h',
          text: otu_labels.slice(0, 10)
        }
      ];
  
      const bar_layout = {
        title: {
          text: 'Top 10 bacterial species',
          font: {
            size: 24
          }
        },
        yaxis: {
          
          autorange: 'reversed'
        },
        xaxis: {
          title: {
            text: 'OTU_ID'
          }
        }
      };
  
      Plotly.newPlot('bar', bar_data, bar_layout);
  
      const bubble_data = [
        {
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          marker: {
            size: sample_values,
            color: otu_ids,
            text: otu_labels
          }
        }
      ];
  
      const bubble_layout = {
        title: {
          text: 'Bacterial Species',
          font: {
            size: 24
          }
        },
        xaxis: {
          title: {
            text: 'OTU_ID'
          }
        }
      };
  
      Plotly.newPlot('bubble', bubble_data, bubble_layout);
    });
  }
    

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
