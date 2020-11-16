let Airtable = require('airtable');

let base = new Airtable({apiKey: 'keyfpZwKVsD8rJeMF'}).base('appEix67CO2YQY2rP');

let fetchRecord = function(slug) {
  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  let formula = `Slug="${slug}"`;

  let title = document.querySelector('.dynamic_title');
  let subtitle = document.querySelector('.dynamic_subtitle');
  let main_img = document.querySelector('.dynamic_main_img');
  let description = document.querySelector('.dynamic_description');
  let concept = document.querySelector('.dynamic_concept');
  let refining = document.querySelector('.dynamic_refining');
  let fabricating = document.querySelector('.dynamic_fabricating');
  let summary = document.querySelector('.dynamic_summary');
  let created_year = document.querySelector('.dynamic_year');
  let institution = document.querySelector('.dynamic_institution');
  // let media = document.querySelector('.dynamic_meida');
  // let role = document.querySelector('.dynamic_role');
  // let credits = document.querySelector('.dynamic_credits');

  base('Main').select({
    filterByFormula: formula,
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        main_img.setAttribute('src', record.fields.Project_img[0].thumbnails.full.url);

        title.innerHTML = record.fields.Title;
        subtitle.innerHTML = record.fields.Subtitle;
        description.innerHTML = record.fields.Description;
        concept.innerHTML = record.fields.Concept;
        refining.innerHTML = record.fields.Refining;
        fabricating.innerHTML = record.fields.Fabricating;
        summary.innerHTML = record.fields.Summary;
        created_year.innerHTML = new Date (record.fields.Created_date).getFullYear();//convret Date to year
        institution = record.fields.Summary;
        // role.innerHTML = record.fields.Role;
        // credits.innerHTML = record.fields.Credits;
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

let makeNavigation = function() {
  let navigationContainer = document.querySelector('.dynamic_navigation');

  base('Main').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        listItem.classList.add('dropdown-item');
        let link = 'index.html?' + record.fields.Slug;

        anchor.innerHTML = record.fields.Title;
        anchor.setAttribute('href', link);

        listItem.appendChild(anchor);

        navigationContainer.appendChild(listItem);
    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}


document.addEventListener('DOMContentLoaded', function (event) {
  // DOM Loaded!
  let searchParam = document.location.search;

  let slug = searchParam.substring(1);

  fetchRecord(slug);

  makeNavigation()
});