$(document).ready(function () {
  $('#register-frm').on('submit', function (event) {
    // event.preventDefault();

    //extract the information from the form => serialize

    const formContent = $(this).serialize();

    $.ajax({
      url: `http://localhost:8000/register`,
      method: 'POST',
      data: formContent,
    })
      .done((result) => console.log(result))
      .fail(() => console.log('Error'));
  });
});
