<template>
	<div class="title">
		 <div class="line"></div>
        <div class="text">{{ content }}</div>
        <div class="line"></div>
	</div>
</template>

<script>
	export default{
		props: {
			content: {
				type: String
			}
		}
	}
</script>

<style scoped>
	.title{
	    display: flex;
	    width: 80%;
	    margin: 28px auto 24px auto;
	}
	.title .line{
	    flex: 1;
	    position: relative;
	    top: -6px;
	    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.title .text{
	    padding: 0 12px;
	    font-size: 14px;
	    font-weight: bold;
	}
</style>