var subjectObject = {
    "Btech": ["Btech1", "Btech2", "Btech3", "Btech4", "Btech5", "Btech6"],
    "Mtech": ["Mtech1", "Mtech2", "Mtech3", "Mtech4"],
    "Bsc": ["Bsc1", "Bsc2", "Bsc3", "Bsc4", "Bsc5"],
    "Msc": ["Msc1", "Msc2", "Msc3"],
    "Phd": ["Phd1", "Phd2"]
  }
  
  window.onload = function () {
    var subjectSel = document.getElementById("programme");
    var topicSel = document.getElementById("discipline");
    for (var x in subjectObject) {
      subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function () {
      topicSel.length = 1;
      for (var y in subjectObject[this.value]) {
        z = subjectObject[this.value].length;
        var newValue = subjectObject[this.value][y];
        // console.log(newValue);
        topicSel.options[topicSel.options.length] = new Option(newValue, newValue);
      }
    }
  }