var data = {
  tables: {
    evaluations: [{
      "id": 1,
      "description": "Première évaluation test_1",
      "created_at": Date.now(),
      "classe_id": 1,
      "cycle_id": 1,
      "trimestre_id": 1
    }],
    evaluations_competences: [{
      "id": 1,
      "evaluation_id": 1,
      "competence_id": 1
    }, {
      "id": 2,
      "evaluation_id": 1,
      "competence_id": 2
    }, {
      "id": 3,
      "evaluation_id": 1,
      "competence_id": 3
    }]
  }
};


var db = require("../../db");
db.connect(db.MODE_DEV, function () {
  // db.drop(["competences", "domaines", "eleves", "classes"], function (err) {
  //   if (err) return console.log(err);
  //   console.log("Drop tables...");
  // });
  db.fixtures(data, function (err) {
    if (err) return console.log(err);
    console.log("Data has been loaded...");
  });
});