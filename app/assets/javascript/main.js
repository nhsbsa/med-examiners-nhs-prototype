// ES6 or Vanilla JavaScript
// show/hide more details if gender other is selected
$(document).on('change', '[name="gender"]', function () {
    var gender = $(this);
    var formGroup = $('#form-group-gender-other');
    var cssClass = 'nhsuk-form-group--hidden';
    if (gender.val() == 'other')
        formGroup.removeClass(cssClass);
    else
        formGroup.addClass(cssClass);
});

// disable input if unknown checked
$(document).on('change', '[data-unknown]', function () {
    var target = $(this).attr('data-unknown');
    target = target.split(',');
    for (var i = 0; i < target.length; i++) {
        if ($(this).is(':checked')) {
            $(target[i]).val('').attr('disabled', true);
        } else {
            $(target[i]).removeAttr('disabled');
        }
    }
});

// disable unknown checkbox if inputs have value
$(document).ready(function () {
    $('[data-disable-if-value]').each(function () {
        var element = $(this);
        var target = $(element).attr('data-disable-if-value');
        target = target.split(',');
        for (var i = 0; i < target.length; i++) {
            $(target[i]).on('keyup blur focus copy paste', function () {
                if ($(this).val() == '') {
                    $(element).attr('checked', false).removeAttr('disabled');
                } else {
                    $(element).attr('checked', false).attr('disabled', true);
                }
            });
        }
    });
});

// show hide for QAP discussion time line item outcomes
$(document).on('change', '#me_qap_decision2,#me_qap_decision1', function () {
    // Determine which has been clicked
    console.log($("input[name='me_qap_decision']:checked").val());
    let me_qap_decision = $("input[name='me_qap_decision']:checked").val();

    if (me_qap_decision === "coroner")
    {
        $('#me_qap_decision1-show').show();
        $('#me_qap_decision2-show').hide();
    }

    if (me_qap_decision === "mccd")
    {
        $('#me_qap_decision1-show').hide();
        $('#me_qap_decision2-show').show();
    }
});

// work out age from dob and dod
$(document).on('keyup blur focus copy paste',
    '#dob-day,#dob-month,#dob-year,#dod-day,#dod-month,#dod-year', function () {
        var dobDay = $('#dob-day').val();
        var dobMonth = $('#dob-month').val();
        var dobYear = $('#dob-year').val();
        var dodDay = $('#dod-day').val();
        var dodMonth = $('#dod-month').val();
        var dodYear = $('#dod-year').val();
        if (dobDay != '' && dobMonth != '' && dobYear != '' && dodDay != '' && dodMonth != '' && dodYear != '') {
            var dateOfBirth = moment([dobYear, dobMonth, dobDay]);
            var dateOfDeath = moment([dodYear, dodMonth, dodDay]);
            var age = dateOfDeath.diff(dateOfBirth, 'years');
            if (Number.isInteger(age) && age > 0)
                $('#age').html(age)
            else
                $('#age').html(0);
        } else {
            $('#age').html(0);
        }
    });

$(document).ready(function () {

    // Hide QAP discussion outcome options until mccd or coroner is selected
    $('#me_qap_decision1-show').hide();
    $('#me_qap_decision2-show').hide();

    // prevent forms from actually submitting
    // as we have no back-end for the prototype
    $('form').on('submit', function (e) {
        e.preventDefault();
    });
    // validation
    $('#add-case').validate({
        //ignore: 'input[required!=\'required\']',
        errorClass: 'nhsuk-error-message',
        errorElement: 'label',
        errorPlacement: function (error, element) {
            // $(element)
            //   .before(error);
        },
        highlight: function (element) {
            $(element)
                .parents('.nhsuk-form-group')
                .addClass('nhsuk-form-group--error');
            if ($(element).is('textarea'))
                $(element).addClass('nhsuk-textarea--error');
            else if ($(element).is('select'))
                $(element).addClass('nhsuk-select--error');
            else
                $(element).addClass('nhsuk-input--error');
        },
        unhighlight: function (element) {
            $(element)
                .parents('.nhsuk-form-group')
                .removeClass('nhsuk-form-group--error')
            if ($(element).is('textarea'))
                $(element).removeClass('nhsuk-textarea--error');
            else if ($(element).is('select'))
                $(element).removeClass('nhsuk-select--error');
            else
                $(element).removeClass('nhsuk-input--error');
        }
    });
});

// toggle outcome scrutiny
$(document).on('click', '[data-toggle]', function () {
    var target = $(this).attr('data-toggle');
    $(target).toggle();
});

// show extra boxes
$(document).on('click', '[data-show]', function () {
    var target = $(this).attr('data-show');
    $(this).remove();
    $(target).removeClass('hide');
});

// duplicate forms
$(document).on('click', '[data-duplicate-from]', function () {
    var element = $(this).attr('data-duplicate-element');
    var from = $(this).attr('data-duplicate-from');
    var to = $(this).attr('data-duplicate-to');
    var html = $(from).clone().html();
    var count = $(element).length + 1;
    html = html.replace(/{number}/g, count);
    $(to).append(html);
});

// remove forms
$(document).on('click', '[data-remove-element]', function () {
    var element = $(this).attr('data-remove-element');
    $(element).remove();
})

// show/hide more details if value YES selected
$(document).on('change', '[name="cremation_issues"]', function () {
    var element = $(this);
    var formGroup = $('#cremation_issues_details').parents('.nhsuk-form-group');
    var cssClass = 'nhsuk-form-group--hidden';
    if (element.val() == 'yes')
        formGroup.removeClass(cssClass);
    else
        formGroup.addClass(cssClass);
});

$(document).on('change', '[name="personal_effects"]', function () {
    var element = $(this);
    var formGroup = $('#personal_effects_details').parents('.nhsuk-form-group');
    var cssClass = 'nhsuk-form-group--hidden';
    if (element.val() == 'yes')
        formGroup.removeClass(cssClass);
    else
        formGroup.addClass(cssClass);
});

$(document).on('change', '[data-toggle-button]', function () {
    var button = $(this).attr('data-toggle-button');
    if ($(this).is(':checked'))
        $(button).removeAttr('disabled');
    else
        $(button).attr('disabled', 'disabled');
});

$(document).on('change', '#mccd_issued, #gp_notification', function () {
    var mccd_issued = $('#mccd_issued');
    var gp_notification = $('#gp_notification');
    var button = $('#submit_close_case');
    if ($(mccd_issued).is(':checked') && $(gp_notification).is(':checked')) {
        $(button).removeAttr('disabled');
        $(button).parents('.nhsuk-box').removeClass('nhsuk-box--disabled');
    } else {
        $(button).attr('disabled', 'disabled');
        $(button).parents('.nhsuk-box').addClass('nhsuk-box--disabled');
    }
});

// timeline events
$(document).on('change', '#timeline_event_template', function () {
    var template = $(this).val();
    if (template != '')
        template = $('#' + template).clone().html();
    $('#eventTemplateHTML').html(template);
    var info = $(this).find('option:selected').attr('data-info');
    if (info != '')
        $('#eventTemplateInfo').html('<div class="nhsuk-info">' + info + '</div>');
    else
        $('#eventTemplateInfo').html('');
    $('html, body').animate({
        scrollTop: $("#timeline-section").offset().top
    }, 0);

    // Hide QAP discussion outcome options until mccd or coroner is selected
    $('#me_qap_decision1-show').hide();
    $('#me_qap_decision2-show').hide();
});

// amend a template
$(document).on('click', '[data-amend-event]', function () {
    var template = $(this).attr('data-amend-event');
    $('#timeline_event_template').val(template).change().selectric('refresh');
});

// add event to timeline
$(document).on('click', '[data-add-event]', function () {
    var template = $(this).attr('data-add-event');
    template = $(template).clone().html();
    var count = $('.timeline__item').length + 1;
    template = template.replace(/{number}/g, count);
    $('#events').append(template);
    $('#timeline_event_template').val('').change().selectric('refresh');
    $('html, body').animate({
        scrollTop: $("#event" + count).offset().top
    }, 0);
});

// expanded
$(document).on('click', '.timeline__item__expander', function () {
    $(this).parents('.timeline__item').toggleClass('timeline__item--expanded');
});

$(document).on('click', '.nhsuk-case__header__arrow', function () {
    $(this).parents('.nhsuk-case').toggleClass('nhsuk-case--open');
});

$(document).ready(function () {

    $('select').selectric();

    $('#timeline_event_template').selectric({
        optionsItemBuilder: function (itemData) {
            return itemData.value !== '' ? '<span class="swatch swatch--' + itemData.value + '"><span class="text">' + itemData.text + '</span></span>' : itemData.text;
        },
        labelBuilder: function (currItem) {
            return currItem.value !== '' ? '<span class="swatch swatch--' + currItem.value + '"><span class="text">' + currItem.text + '</span></span>' : currItem.text;
        }
    }).on('selectric-select', function (e) {
    });

});


$(document).on('change', '[name="rep"]', function () {
    var element = $(this);
    var rep1 = $('#representative1');
    var rep2 = $('#representative2');
    var cssClass = 'hide';
    if (element.val() == 'rep1') {
        rep2.addClass(cssClass);
        rep1.removeClass(cssClass);
    } else {
        rep1.addClass(cssClass);
        rep2.removeClass(cssClass);
    }
});

// assign me/meo
$(document).on('change', '[name="team_me"], [name="team_meo"]', function () {
    var me = $('#team_me');
    var meo = $('#team_meo');
    var assign1_template = $('#assign1-template').clone().html();
    var assign2_template = $('#assign2-template').clone().html();
    if (me.val() != '' || meo.val() != '') {
        if (me.val() != '' && meo.val() == '')
            var assign1 = me.val();
        if (me.val() == '' && meo.val() != '')
            var assign1 = meo.val();
        var legend = 'Are you sure you would like to assign <b>' + assign1 + '</b> to this case?';
        if (me.val() != '' && meo.val() != '')
            var legend = 'Are you sure you would like to assign <b>' + me.val() + '</b> and <b>' + meo.val() + '</b> to this case?';
        assign2_template = assign2_template.replace(/{legend}/g, legend);
        $('#assignment').html(assign2_template);
    } else {
        $('#assignment').html(assign1_template);
    }
});

// enable button for me/meo assignment
$(document).on('change', '[name="assign_me"]', function () {
    var button = $('[data-assign-continue]');
    if ($(this).val() == 'yes')
        $(button).removeAttr('disabled');
    else
        $(button).attr('disabled', 'disabled');
});


// meo summary
$(document).on('change', '[name="clinical_governance_review"]', function () {
    var element = $(this);
    var formGroup = $('#clinical_governance_review_notes').parents('.nhsuk-form-group');
    var cssClass = 'nhsuk-form-group--hidden';
    if (element.val() == 'yes')
        formGroup.removeClass(cssClass);
    else
        formGroup.addClass(cssClass);
});

// concerns were raised
$(document).on('change', '[name="outcome_of_conversation"]', function () {
    var element = $(this);
    var cwr = $('#concerns-were-raised');
    var cssClass = 'hide';
    if (element.val() == 'concerns_were_raised') {
        cwr.removeClass(cssClass);
    } else {
        cwr.addClass(cssClass);
    }
});