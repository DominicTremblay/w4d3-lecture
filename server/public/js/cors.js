$(document).ready(function () {
  $('#register-frm').on('submit', function (event) {

    event.preventDefault();
    // get the content of the form
    const content = $(this).serialize();

    $.ajax({
      url:`http://localhost:8000/register`,
      method: 'POST',
      data: content,
    })
      .done((result) => {
        console.log(result);
      })
      .fail((err) => console.log(err.message));
  });
});
