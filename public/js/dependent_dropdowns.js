// var subjectObject = {
//     "B.Tech": ["Civil Engineering","Chemical Engineering", "Computer Science and Engineering", "Electrical Engineering", "Mechanical Engineering", "Materials Engineering", "Biological Engineering", "Earth System Science", "Earth Sciences", "Chemistry", "Mathematics", "Physics", "Cognitive Science", "Humanities and Social Science"],
//     "B.Sc. in Engineering":["Physics", "Chemistry", "Cognitive Sciences"],
//     "PGDIIT":["Physics", "Chemistry", "Cognitive Sciences"],
//     "B.Tech.-M.Tech. Dual degree":["Physics", "Chemistry", "Cognitive Sciences"],
//     "M.Tech": ["Biological Engineering", "Chemical Engineering", "Civil Engineering", "Computer Science & Engineering", "Earth System Science", "Electrical Engineering", "Mechanical Engineering", "Materials Engineering"],
//     "M.Sc.": ["Physics", "Chemistry", "Cognitive Sciences"],
//     "MA": ["Physics", "Chemistry", "Cognitive Sciences"],
//     "Ph.D.": ["Chemical Engineering", "Civil Engineering", "Computer Science & Engineering", "Electrical Engineering", "Mechanical Engineering", "Materials Engineering"]
//   }
var subjectObject = {
  "B.Tech.": ["Chemical Engineering","Civil Engineering","Computer Science and Engineering", "Electrical Engineering","Materials Engineering","Mechanical Engineering"],
  "B.Sc. in Engineering": ["Chemical Engineering","Civil Engineering","Computer Science and Engineering", "Electrical Engineering","Materials Engineering","Mechanical Engineering"],
  "B.Tech. - M.Tech. Dual Degree":["Biological Engineering","Chemical Engineering","Civil Engineering","Computer Science and Engineering", "Electrical Engineering","Materials Engineering","Mechanical Engineering"],
  "B.Tech. - M.Sc. Dual Degree": ["Chemistry","Cognitive Science","Mathematics", "Physics"],
  "M.Tech.":["Biological Engineering","Chemical Engineering","Civil Engineering","Computer Science and Engineering","Earth System Science","Electrical Engineering", "Materials Engineering","Mechanical Engineering"],
  "PGDIIT":["Biological Engineering","Chemical Engineering","Civil Engineering","Computer Science and Engineering","Earth System Science","Electrical Engineering", "Materials Engineering","Mechanical Engineering"],
  "M.Sc.":["Chemistry","Cognitive Science","Mathematics", "Physics"],
  "M.A.": ["Society and Culture"],
  "Ph.D.":["Biological Engineering","Chemical Engineering","Chemistry","Civil Engineering","Cognitive Science", "Computer Science and Engineering","Earth Sciences","Electrical Engineering","Humanities and Social Sciences","Materials Engineering","Mechanical Engineering","Mathematics", "Physics"],
  "Double Master’s Degree program": ["Biological Engineering","Chemical Engineering","Civil Engineering","Computer Science and Engineering", "Electrical Engineering","Materials Engineering","Mechanical Engineering"]
 
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