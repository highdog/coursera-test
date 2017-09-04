$(function(){
  // function resizeWindow(){
  //   var _width = ($(window).width() - 12) / 3;
  //   var _height = ($(window).height() - 16) / 4;
  //   $('.field').width(_width);
  //   $('.field').height(_height);
  //   $('.field').css({
  //     'box-sizing': 'border-box'
  //   });
  //   $('.field .nogame').css({
  //     'line-height': _height + 'px'
  //   });
  // }
  // resizeWindow();
  // $(window).resize(function() {
  //   resizeWindow();
  // });
  function showField(fieldName, fieldNo) {
    var $field = $('.field-' + fieldNo);
    $field.find('.title').text(fieldName);
    fieldName = encodeURIComponent(fieldName);
    var nowTime = new Date().getTime();
    $.get('/single_score/' + fieldName + '?t=' + nowTime, function(respData) {
      var data = respData.entities[0];
      if (data) {
        var matchId = data.match_uuid;
        if (matchId) {
          $field.attr('data-uuid', matchId);
        }
        $field.find('.nogame').hide();
        $field.find('.team1 .team-name .content').text(data.team1.substr(0, 4));
        $field.find('.team2 .team-name .content').text(data.team2.substr(0, 4));
        $field.find('.team1 .person-name .content').text(data.player1 + (data.player3 && data.player3 !== '未指派' ? '/' + data.player3 : ''));
        $field.find('.team2 .person-name .content').text(data.player2 + (data.player4 && data.player4 !== '未指派' ? '/' + data.player4 : ''));
        $field.find('.team1 .score1 .label').text(data.type);
        $field.find('.team1 .person-name .label').text(data.atype);
        var team1Win = [];
        var team2Win = [];
        var match = data.match;
        if (!match) {
          return false;
        }
        if (match.set_score) {
          if (match.set_status === 3) {
            team1Win.push(true);
          }
          if (match.set_status === 4) {
            team2Win.push(true);
          }
          $field.find('.team1 .score1 .num i').text(match.set_score[0]);
          $field.find('.team2 .score1 .num i').text(match.set_score[1]);
          // if (data.field_no === match.field_no) {
            if (match.status !== 3 && match.status !== 4) {
              $field.find('.team1 .score-sub .num i').text(match.game_score[0]);
              $field.find('.team2 .score-sub .num i').text(match.game_score[1]);
            } else {
              $field.find('.team1 .score-sub .num i').text('-');
              $field.find('.team2 .score-sub .num i').text('-');
            }
          // }
        } else {
          $field.find('.team1 .score1 .num i').text('-');
          $field.find('.team2 .score1 .num i').text('-');
        }
        if (match.is_tiebreak) {
          $field.find('.team1 .score1 sup').text(match.game_score[0]);
          $field.find('.team2 .score1 sup').text(match.game_score[1]);
        }
        if (match.set_status === 3) {
          $field.find('.team1 .win').show();
          $field.find('.team2 .win').hide();
        } else if (match.set_status === 4)  {
          $field.find('.team1 .win').hide();
          $field.find('.team2 .win').show();
        } else {
          $field.find('.team1 .win').hide();
          $field.find('.team2 .win').hide();
        }
      }
    });
  }
  function showResult() {
    showField('一号馆(1)', '1');
    showField('一号馆(2)', '2');
    showField('一号馆(3)', '3');
    showField('一号馆(4)', '4');
    showField('二号馆(1)', '5');
    showField('二号馆(2)', '6');
    showField('二号馆(3)', '7');
    showField('二号馆(4)', '8');
    showField('二号馆(5)', '9');
    showField('二号馆(6)', '10');
    showField('二号馆(8)', '11');
    showField('二号馆(9)', '12');
    showField('室外一', '13');
    showField('室外二', '14');
    showField('室外三', '15');
    showField('室外四', '16');
    showField('室外五', '17');
    showField('室外六', '18');
    if (!window.console) {
      window.console = {
        log: function () {}
      };
    }
    window.console.log(new Date() + '已刷新比赛');
  }
  showResult();
  setInterval(function() {
    showResult();
  }, 5e3);
});
