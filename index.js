let proxy = `proxy.php`


let degrees;
let gMinors;
let gEmployee;
let gResearch;
initAbout()
initDegree()
initMinor()
initEmployment()
initPeople()
initResearch()

//initialize about section  template
function initAbout() {
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/about/'},
        async: true,
        success: (resp) => {
            // progress bar state
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });
            let ui = `  <h1>${resp.title}</h1>
                        <p>${resp.description}</p>
                        <blockquote style="font-size: 18px;">${resp.quote}
                            <span style="display: flex;flex-direction: row-reverse;font-size: 18px;"><br><span style="font-size: 18px">--- ${resp.quoteAuthor}</span></span>
                        </blockquote>`
            $('#about').html(ui)
        }
    })
}

//initialize Degree section  template
function initDegree() {
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/degrees/'},
        async: true,
        success: (resp) => {
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });
            //for not exist img ,render local img
            let img = ['keyboard1.png', 'file1.png', 'jizhi1.png']
            degrees = resp;
            let graduate = resp.graduate
                .filter(v => !v.availableCertificates)
                .map((value, index) => `<div class="column">
                                        <img class="is-center" src="imgs/${img[index]}" alt="">
                                        <div class="tit has-text-centered has-text-white">
                                            ${value.title}
                                        </div>
                                        <div class="cont has-text-centered has-text-white">
                                            ${value.description}
                                        </div>
                                        <a class="button  is-link is-inverted" onclick="handleGraduateSelect('${value.degreeName}')">Click to find out more</a>
                                    </div>`)
                .join('');
            $('#graduate').html(graduate)

            let ungraduateImg = ['earth.png', 'hand.png', 'computer.png']
            let ungraduate = resp.undergraduate
                .map((value, index) => `<div class="column">
                                        <img class="is-center" src="imgs/${ungraduateImg[index]}" alt="">
                                        <div class="tit has-text-centered">
                                            ${value.title}
                                        </div>
                                        <div class="cont has-text-centered">
                                            ${value.description}
                                        </div>
                                        <a class="button  is-link is-inverted" onclick="handleGraduateSelect('${value.degreeName}')">Click to find out more</a>
                                    </div>`)
                .join('');
            $('#ungraduate').html(ungraduate)

        }
    })


}

//initialize Minor section  template
function initMinor() {

    //for not exist img ,use local img
    let imgs = ['database', 'location', 'code', 'mobile', 'Network', 'html5', 'web']
    //for implement different color to every box
    let background = ['#5363ad', '#7d93ad', '#266e2b', '#2e6fad', '#ad4f62', '#7d46ad', '#ad7a35',]
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/minors/'},
        async: true,
        success: (resp) => {
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });
            let minors = resp.UgMinors;
            minors.pop();
            gMinors = minors
            let ui = minors.map((value, index) => ` <div class="minor" onclick="handleMinorDetail('${value.name}')">
                                                                    <div class="rect" style="background:${background[index]};">
                                                                        <img src="imgs/${imgs[index]}.png" alt="">
                                                                        <p class="has-text-centered">${value.title}</p>
                                                                    </div>
                                                                </div>`).join('')
            $('#minors').html(ui)
        }
    })
}

//initialize employment section  template
function initEmployment() {
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/employment/'},
        async: true,
        success: (resp) => {
            gEmployee = resp;
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });
            let introduction = resp.introduction;
            let intro1 = `<div class="content is-small EMPLOYMENT has-text-white">
                                <h1 class="has-text-white">${introduction.content[0].title}</h1>
                                <p class="has-text-white">${introduction.content[0].description}</p>
                            </div>`
            let bigTitle = `<h2 class="has-text-centered has-text-white">${introduction.title}</h2>`
            let degreeStatistics = resp.degreeStatistics.statistics
            // for different background color
            let bgd = ['#5087ad', '#ad5240', '#7b3fad', '#5652ad',]
            let statistics = `<div class="columns">${degreeStatistics.map((value, index) => `
                                                                    <div class="column">
                                                                        <div class="rect" style="background:${bgd[index]}">
                                                                            <h2 class="has-text-centered has-text-white">${value.value}</h2>
                                                                            <p class="has-text-centered has-text-white">${value.description}</p>
                                                                        </div>
                                                                    </div>
                                                              `).join('')}  </div>`
            let cooperative = `<div class="has-text-white content COOPERATIVE is-small">
                                    <h1 class="has-text-white">${introduction.content[1].title}</h1>
                                    <p class="has-text-white">${introduction.content[1].description}</p>
                                </div>
                                <div class="content EMPLOYERS is-small">
                                    <h1 class="has-text-white" style="margin: 0 0 35px 0;">${resp.employers.title}</h1>
                                    <p class="has-text-white" style="display: flex;">${resp.employers.employerNames.map(v => `<span style="margin: 0 50px 0 0;display: inline-block;width: 200px;color: #fff6fc"> ${v} </span>`).join('')}</p>
                                </div>
                                <div class="content CAREERS is-small">
                                    <h1 class="has-text-white" style="margin: 0 0 35px 0;">${resp.careers.title}</h1>
                                    <p class="has-text-white" style="display: flex;">${resp.careers.careerNames.map(v => `<span style="margin: 0 40px 0 0;display: inline-block;width: 200px;color: #fff6fc"> ${v} </span>`).join('')}</p>
                                </div>`

            let cop = `<div class="content CAREERS is-small">
                                <h1 class="has-text-white" style="margin: 0 0 20px 0">To view employment and coop history of our students, click below.</h1>
                                <div class="has-text-white" style="display: flex;flex-wrap: wrap">
                                    <div class="l has-text-centered sstabs has-text-white" style="width: 40%;background: rgba(160,53,65,0.87);padding: 200px 0 ;margin: 0 30px;border-radius: 30px;color: white;font-size: 40px;" onclick="handleClickCoopTable(1)">
                                        ${resp.coopTable.title}
                                    </div>
                                    <div id="hei" class="l has-text-centered sstabs has-text-white"></div>
                                    <div class="l has-text-centered sstabs has-text-white" style="width: 40%;background: rgba(122,94,255,0.82);padding: 200px 0 ;margin: 0 30px;border-radius: 30px;color: white;font-size: 40px;" onclick="handleClickCoopTable(2)">
                                        ${resp.employmentTable.title}
                                    </div>
                                </div>
                            </div>`


            let ui = intro1 + bigTitle + statistics + cooperative + cop
            $('#EMPLOYMENT').html(ui)
        }
    })
}

//initialize People section template
function initPeople() {
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/people/'},
        async: true,
        success: (resp) => {
            //progress bar stat
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });
            let faculty = `   <h2 class="has-text-centered">${resp.title}</h2>
                                <div class="tabs is-centered">
                                    <ul>
                                        <li id="fac-li" class="is-active" onclick="$('.faculty').css({display:'block'});$('.stuff').css({display:'none'});$('#fac-li').addClass('is-active');$('#sta-li').removeClass('is-active')"><a style="border-bottom-width: 0px">FACULTY</a></li>
                                        <li id="sta-li" onclick="$('.faculty').css({display:'none'});$('.stuff').css({display:'block'});$('#fac-li').removeClass('is-active');$('#sta-li').addClass('is-active')"><a style="border-bottom-width: 0px">STAFF</a></li>
                                    </ul>
                                </div>
                                <div class="mycol">
                                ${resp.faculty.map(v => `

                                    <div class="box peo-box faculty">
                                        <p>${v.name}</p>
                                        <p>${v.title}</p>
                                    </div>

                                `).join('')}

                                ${resp.staff.map(v => `
                                    <div class="box peo-box stuff" style="display:none">
                                        <p>${v.name}</p>
                                        <p>${v.title}</p>
                                    </div>
                                `).join('')}
                                 </div>
                               `
            $('#people').html(faculty)
        }
    })
}

//initialize Research section template
function initResearch() {
    $.ajax({
        method: 'get',
        url: `${proxy}`,
        dataType: 'json',
        data: {path: '/research/'},
        async: true,
        success: (resp) => {
            gResearch = resp
            $('#demoprogressbar1').LineProgressbar({
                percentage: addProgress(), fillBackgroundColor: '#e67e22'
            });

            let facultyItem = resp.byInterestArea.map(v => `<div class="box peo-box" style="cursor: pointer" onclick="handleFacultyClick('${v.areaName}')">
                                                                <p>${v.areaName}</p>
                                                            </div>`).join('')

            let byFaculty = resp.byFaculty.map(value => `
                                                <div class="box peo-box" style="cursor: pointer" onclick="handleClickByFaculty('${value.facultyName}')">
                                                    <p>${value.facultyName}</p>
                                                    <p>${value.username}</p>
                                                </div>`)
            $('#faculty-research').html(facultyItem)
            $('#byFaculty').html(byFaculty)
        }
    })

}

// event handler for graduate selcted
function handleGraduateSelect(name) {
    let arr = degrees.graduate.concat(degrees.undergraduate);
    let el = arr.find(value => value.degreeName === name);
    $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">${el.title}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.concentrations.map(value => `<li>${value}</li>`).join('')}
                                            </ul>
                                            <p>To learn more about this degree, visit our website <a href="">http://hci.rit.edu</a></p>
                                        </div>
                                    </div>
                                </section>

                            </div>`)
    $(`#modal`).toggleClass("is-active")
}

// event handler for Faculty Click
function handleFacultyClick(name) {

    let el = gResearch.byInterestArea.find(v => v.areaName === name);
    $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">${el.areaName}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.citations.map(value => `<li>${value}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                            </div>`)
    $(`#modal`).toggleClass("is-active")
}

// event handler for ByFaculty Click
function handleClickByFaculty(name) {

    let el = gResearch.byFaculty.find(v => v.facultyName === name);
    $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">${el.facultyName}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.citations.map(value => `<li>${value}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                            </div>`)
    $(`#modal`).toggleClass("is-active")
}

// event handler for Minor detail Click
function handleMinorDetail(name) {

    let el = gMinors.find(value => value.name === name);
    $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title" style="width: 300px;white-space: nowrap;text-overflow:ellipsis;">${el.description}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.courses.map(value => `<li>${value}</li>`).join('')}
                                            </ul>
                                            <p>${el.note}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>`)
    $(`#modal`).toggleClass("is-active")
}

// event handler for CoopTable detail Click
function handleClickCoopTable(tag) {
    if (tag === 1) {
        let el = gEmployee.coopTable
        $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title" style="width: 300px;white-space: nowrap;text-overflow:ellipsis;">${el.title}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.coopInformation.map(value => `<li>${value.employer}</li>`).join('')}
                                            </ul>

                                        </div>
                                    </div>
                                </section>
                            </div>`)
        $(`#modal`).toggleClass("is-active")
    } else {
        let el = gEmployee.employmentTable
        $('#modal').html(` <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title" style="width: 300px;white-space: nowrap;text-overflow:ellipsis;">${el.title}</p>
                                    <button class="delete" aria-label="close" onclick="$('#modal').toggleClass('is-active')"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <div class="content">
                                            <ul>
                                            ${el.professionalEmploymentInformation.map(value => `<li>${value.employer}</li>`).join('')}
                                            </ul>

                                        </div>
                                    </div>
                                </section>
                            </div>`)
        $(`#modal`).toggleClass("is-active")
    }
}

// state for progress
let progress = 0

//update state of progress
function addProgress() {
    progress += (100 / 6) + 1
    if (progress > 100) {
        progress = 100
        $('#demoprogressbar1').remove()
    }
    return progress
}


$(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

});