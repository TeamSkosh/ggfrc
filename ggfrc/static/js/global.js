$(document).ready(function() {
    $(".add-repeatable-section").click(function(){
        console.log("Add Section!");
        var button = $(this);
        var counter = button.data("counter");
        var next_section = false;
        var section_prefix = button.data("section-prefix");
        var max = button.data("max");

        if (section_prefix == undefined) {
            return false;
        }

        if (max === undefined) {
            max = 0;
        }

        if (counter === undefined) {
            return false;
        } else {
            next_section = parseInt($(counter).val()) + 1;
        }

        if (max > 0 && next_section > max)  {
            alert("Sorry, you can only have " + max + " sections.");
            return false;
        } else {
            var next_section_selector = "#" + section_prefix + next_section;
        }

        $(next_section_selector).removeClass("hidden");

        $(counter).val(next_section);
    });

    $(".remove-repeatable-section").click(function(){
        console.log("Remove Section!");
        var button = $(this);
        var counter = button.data("counter");
        var prev_section = false;
        var section_prefix = button.data("section-prefix");
        var min = button.data("min");

        if (section_prefix == undefined) {
            return false;
        }

        if (min === undefined) {
            min = 1;
        }

        if (counter === undefined) {
            return false;
        } else {
            current_section = parseInt($(counter).val());
            prev_section = current_section - 1;
        }

        if (prev_section < min) {
            alert("You must have at least " + min + " section(s).");
            return false;
        }

        var section_selector = "#" + section_prefix + current_section;

        $(section_selector).addClass("hidden");
        $(counter).val(prev_section);
    });
});// JavaScript Document
