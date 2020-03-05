<script>
	import userStore from '../../stores/user-store';

	export let segment;

	function onLogout() {
		userStore.unsetUser();
	}
</script>

<style lang="scss">
	nav {
		display: flex;
		width: 100%;
		border-bottom: 1px solid $color-primary--100;
		font-weight: 300;
		padding: 0 1em;
		justify-content: space-between;
		box-sizing: border-box;
	}

	ul {
		display: flex;
		margin: 0;
		padding: 0;
		align-items: stretch;
		list-style: none;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: $color-primary;
		display: block;
		bottom: -1px;
	}

	a,
	span {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.end {
		justify-self: flex-end;
	}
	.middle {
		display: inline-flex;
		align-items: center;
	}
</style>

<nav>
	<ul>
		<li>
			<a aria-current={segment === undefined ? 'page' : undefined} href=".">
				home
			</a>
		</li>
		<li>
			<a aria-current={segment === 'about' ? 'page' : undefined} href="about">
				about
			</a>
		</li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
				 the blog data when we hover over the link or tap it on a touchscreen -->
		<li>
			<a
				rel="prefetch"
				aria-current={segment === 'blog' ? 'page' : undefined}
				href="blog">
				blog
			</a>
		</li>
		<li>
			<a
				rel="prefetch"
				aria-current={segment === 'events' ? 'events' : undefined}
				href="events">
				events
			</a>
		</li>
	</ul>
	<ul class="end">
		{#if $userStore.loading}
		<li>
			<span>loading...</span>
		</li>
		{:else}
			{#if $userStore.logged}
				<li>
					<span>User: {$userStore.name || ''}</span>
				</li>
				<li class="middle">
					<button on:click|preventDefault={onLogout}>logout</button>
				</li>
			{:else}
				<li>
					<a
						href="/login"
						aria-current={segment === 'login' ? 'login' : undefined}
					>login</a>
				</li>
			{/if}
		{/if}
	</ul>
</nav>
