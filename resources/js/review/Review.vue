<template>
    <div>
        <div class="form-group">
            <label class="text-muted"
                >Select the star rating on a scale of 1-5</label
            >
            <star-rating :rating="5" class="fa-3x"></star-rating>
        </div>
        <div class="form-group">
            <label for="content" class="text-muted"
                >Describe your experience</label
            >
            <textarea
                name="content"
                cols="30"
                rows="10"
                class="form-control"
            ></textarea>
        </div>

        <button class="btn btn-lg btn-block btn-primary">Submit</button>
    </div>
</template>

<script>
export default {
    data() {}
};
</script>
