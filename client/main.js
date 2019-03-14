$(document).ready(()=>{
  let currentInfo = {};

  const parseInfo = (info) => {
    info.forEach((pair) => {
      const { name, value } = pair;
      currentInfo[name] = value;
    });
  };

  $('.checkout').on('click', ()=>{
    $('#address-box').toggle();
  });

  $('.close-payment').click(()=>{
    $('#payment-box').toggle();
  });

  $('.close-verify').click(()=>{
    $('#verify-box').toggle();
  });

  $('.close-confirmation').click(()=>{
    $('#confirmation').toggle();
  });

  $('.close').click(()=>{
    $('#address-box').toggle();
  });

  $('.next').click((e) => {
    e.preventDefault();
    parseInfo($('#address-form').serializeArray());
    $('#address-box').toggle();
    $('#payment-box').toggle();
  });

  $('.back').click((e) => {
    e.preventDefault();
    $('#payment-box').toggle();
    $('#address-box').toggle();
  });

  $('.back-two').click((e) => {
    e.preventDefault();
    $('#verify-box').toggle();
    $('#verify-list').empty();
    $('#payment-box').toggle();
  });

  $('.verify').click((e) => {
    e.preventDefault();
    parseInfo($('#payment-form').serializeArray());
    $('#payment-box').toggle();
    $('#verify-box').toggle();
    for (let key in currentInfo) {
      if (currentInfo[key]) {
        $('#verify-list').append(`<li class="list-group-item container">${currentInfo[key]}</li>`);
      }
    }
  });

  $('.submit').click((e) => {
    e.preventDefault();
    $.ajax({
      url: '/checkout',
      type: 'POST',
      data: { currentInfo },
      success: (result) => {
        $('#confirmation').toggle();
        $('.response').text('Your information was successfully submitted');
      },
      error: (error) => {
        $('#confirmation').toggle();
        $('.response').text('Something went wrong, please try again.');
      }
    });
    $('#verify-box').toggle();
    $('#verify-list').empty();
    currentInfo = {};
  });
});