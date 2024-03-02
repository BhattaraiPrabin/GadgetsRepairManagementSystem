
let selectedreview = 0;

$('.star').on('click', function () {
    selectedreview = $(this).data('review');
    $('#selectedreview').val(selectedreview);
    $('.star').removeClass('selected');
    for (let i = 1; i <= selectedreview; i++) {
        $(`.star[data-review="${i}"]`).addClass('selected');
    }
});

$('.star').hover(function () {
    const review = $(this).data('review');
    $('.star').removeClass('selected');
    for (let i = 1; i <= review; i++) {
        $(`.star[data-review="${i}"]`).addClass('selected');
    }
}, function () {
    $('.star').removeClass('selected');
    for (let i = 1; i <= selectedreview; i++) {
        $(`.star[data-review="${i}"]`).addClass('selected');
    }
});

function submitreview() {
    const reviewText = $('#reviewText').val();

    // Check if a review is selected
    if (selectedreview === 0) {
        alert('Please select a review.');
        return;
    }

    // Add your logic to submit the review and review (e.g., send to a server)
    console.log('review:', reviewText);
    console.log('review:', selectedreview);

    // You can redirect or show a success message here
}
