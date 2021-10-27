const sheetId = '1E0Kr4PkIdy58Ra8qxeBKUzVI9ByXrHlncvTRfrDVptE';
const sheetTable = '1493728900';
const sf =
  'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:json&tq?&gid=' + sheetTable + '';
$.ajax({ url: sf, type: 'GET', dataType: 'text' })
  .done(function (data) {
    const r = data.match(
      /google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/
    );
    if (r && r.length == 2) {
      const obj = JSON.parse(r[1]);
      const table = obj.table;
      const dataRows = table.rows.map(({ c }) =>
        c.map((e) => (e ? e.v || '' : ''))
      );

      let ele = '';
      for (let i = 0; i < dataRows.length; i++) {
        const userRow = 1;
        const turnOver = 2;
        const reward = 3;
        const dataUser = dataRows[i][userRow];
        const userCode = codeUser(dataUser);
        const dataTurnOver = dataRows[i][turnOver];
        const dataReward = dataRows[i][reward];
        const threeUser = dataUser.toString().substr(0, 3);
        const lestFour = dataUser.toString().substr(6, 4);
        const userHide =threeUser +'-' +new Array(dataUser.toString().length - 5).join('X') +'-' +lestFour;
        ele += `
                    <tr data-user='${userCode}' class='box__content__table'>
                        <td class='box__table number'>${i + 1}</td>
                        <td class='box__table box__table__user'>${userHide}</td>
                        <td class='box__table'>${dataTurnOver}</td>
                        <td class='box__table box__reward'>${dataReward}</td>    
                    </tr>
                    `;
      }
      $('#box__content').html(ele);
     let numPage = {};
          const rowsPerPage = 25;
          const rows = $('#box__content__all tbody tr');
          const rowsCount = rows.length;
          const pageCount = Math.ceil(rowsCount / rowsPerPage);
          const numbers = $('#numbers');
        for (let i = 0; i < pageCount; i++) {
            const pageStart = 0;
            const pageEndBlock = pageStart + 5;
            numbers.append('<a data-page="'+(i+1)+'" class="page__num page__'+(i+1)+'" href="#">' + (i + 1) + '</a>');
          const iPlus = (i+1);
            if(i > pageEndBlock ){
                $('.page__'+iPlus).addClass('d-none');
            }    
        }
      $('#numbers a:first-child').addClass('active');
      displayRows(1);
      $('.page__num').on('click', function() {
          let numPagePrev = {};
        const dataPage = this.dataset.page;
        const pageNext = (dataPage*2)-(dataPage-1);
        const pageNextRe = (dataPage*2)-(dataPage-5);
        let numPrev = pageNext-5;
        numPagePrev = {numPrev};
        if(this && dataPage != pageCount){
       $('.page__'+ pageNext).removeClass('d-none');
       $('.page__'+ (pageNext-6)).addClass('d-none');
     }
        if(numPagePrev.numPrev<dataPage && dataPage != 1){
          $('.page__'+ (dataPage-1)).removeClass('d-none');
          $('.page__'+ (pageNextRe)).addClass('d-none');
        }
      })

      $('.button__next').on('click', function () {
        $('#numbers').find('a.active').next('a').trigger('click');
        const pageActive = $('#numbers').find('a.active')
        const numberPage = pageActive[0].dataset.page;
        numPage = {numberPage};
        const pageNummber = numPage.numberPage;
        const nextLast = ('page',pageNummber.toString()*2)-(pageNummber.toString()-1);
        for(let i = 0; i < pageCount; i++){
            if(pageNummber.toString() > 4  &&  pageCount != pageNummber.toString() ) {
                $('.page__'+ nextLast).removeClass('d-none');
                $('.page__'+ (pageNummber.toString()-5)).addClass('d-none');
            }else if(pageNummber.toString() < 4 && pageCount === pageNummber.toString()){
              $('.page__'+ pageCount).removeClass('d-none');
            } 
        }
      });

      $('.button__pre').on('click', function () {
        const list = $('#numbers').find('a');
        const pageActive = $('#numbers').find('a.active')
        const numberPage = pageActive[0].dataset.page;
        numPage = {numberPage};
        $.each(list, function (position, element) {
          if ($(element).is('.active')) {
            $(list[position - 1]).trigger('click');
          }
        });
        const pageNummber = numPage.numberPage;
           const prevPage = ('page',pageNummber.toString()*2)-(pageNummber.toString()-4);
           for(let i = 0; i < pageCount; i++){
            if(pageNummber.toString() < pageCount && pageNummber.toString() > 2) {
                $('.page__'+ prevPage).addClass('d-none');
                $('.page__'+ (pageNummber.toString()-2)).removeClass('d-none');
            }
        }
      });
      $('#numbers a').click(function (e) {
        const eThis = $(this);
        e.preventDefault();
        $('#numbers a').removeClass('active');
        eThis.addClass('active');
        let numberPageA = eThis.text();
        displayRows(numberPageA);
      });
      function displayRows(index) {
        const start = (index - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.hide();
        rows.slice(start, end).show();
      }
      $('#myInput').on('keyup', function () {
        const value = $(this).val();
        const userCode = codeUser(value);
         if (value) {
          $('.box__content__table').filter(function () {
            $(this).toggle(
              $(this)[0].dataset.user.toLowerCase().indexOf(userCode) > -1
            );
            $('.pagination').hide();
          });
        } else {
          displayRows(1);
          $('#numbers a').removeClass('active');
          $('#numbers a:first-child').addClass('active');
          $('.pagination').show();
        }
      });
      function codeUser(num) {
        let userNum = num.toString();
        const userCode = {1: 'qg',2: 're',3: 'tw',4: 'de',5: 'xs',6: 'hd',7: 'og',8: 'pr',9: 'xw',0: 'sg',
        };
        for (let val in userCode) {
          userNum = userNum.split(val).join(userCode[val]);
        }
        return userNum;
      }
      
    }
  })
  .fail((e) => console.log(e.status));


