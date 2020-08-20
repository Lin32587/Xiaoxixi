<template>
	<view>
		<u-loadmore :status="status" bg-color="#F5F6FA" />
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				default: 0
			}
		},
		data() {
			return {
				status: 'loadmore'
			}
		},
		watch: {
			type(val) {
				switch (val) {
					case 0:
						this.status = 'loadmore'
						return
					case 1:
						this.status = 'loading'
						return
					case 2:
						this.status = 'nomore'
						return
				}

			}
		},
		filters: {
			nameFilter(val) {}
		}
	}
</script>

<style>
</style>
