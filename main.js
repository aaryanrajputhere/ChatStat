document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the uploaded file
    var fileInput = document.getElementById('zipFile');
    var file = fileInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var zipData = event.target.result;
            
            // Use jszip to load the zip file
            JSZip.loadAsync(zipData).then(function(zip) {
                // Assume there's only one file in the zip for simplicity
                var textFile = Object.values(zip.files)[0];
                
                // Extract text content from the file
                textFile.async('text').then(function(text) {
                    // Do calculations with the text content
                    console.log(text)
                    var formToHide = document.getElementById('uploadForm');

                    // Set the CSS display property to "none" to hide the form
                    formToHide.style.display = "none";
                    var you = document.getElementById('yourName').value;
                    var other = document.getElementById('otherPersonsName').value;
                    // Now you have the text content in the variable 'text', you can perform calculations or any other operations on it
                    var youCount = 0;
                    var otherCount = 0;
                    var youLen = 0 ;
                    var otherLen = 0;
                    console.log(you);
                    console.log(other);
                    let lines = text.split("\n");
                    lines.forEach(line => {
                        console.log(line);
                        console.log("-------------------");
                        if(line.includes(you)){
                            youCount++;
                            youLen = youLen + line.length;
                        }
                        else if(line.includes(other)){
                            otherCount++;
                            otherLen = otherLen + line.length;
                        }
                    });
                    console.log(you + " : " + youLen);
                    console.log(other + " : " + otherLen);
                    const convoHeading = document.getElementById("convoHeading");
                    convoHeading.textContent="Who messages more?"
                    const convo = document.getElementById("convo");
                   
                    new Chart(convo, {
                      type: 'pie',
                      data : {
                        labels: [
                          you,
                          other,
                        ],
                        datasets: [{
                          label: 'Number of Messages',
                          data: [youCount,otherCount],
                          backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            
                          ],
                          hoverOffset: 4
                        }]
                      }
                    });
                    const charCountHeading = document.getElementById("charCountHeading");
                    charCountHeading.textContent="Whose messages are bigger?"
                    const charCount = document.getElementById("charCount");
                   
                    new Chart(charCount, {
                      type: 'pie',
                      data : {
                        labels: [
                          you,
                          other,
                        ],
                        datasets: [{
                          label: 'Average Message Length',
                          data: [(youLen/youCount),(otherLen/otherCount)],
                          backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            
                          ],
                          hoverOffset: 4
                        }]
                      }
                    });
                    

                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
});
