<script>
	import { Button } from "$lib/components/ui/button";
	import { FileDown } from "lucide-svelte";
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-4">
	<div
		class="max-w-2xl w-full rounded-lg shadow-xl p-8 text-center border"
	>
		<h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
			Download My CV
		</h1>

		<p class="text-gray-600 dark:text-gray-300 mb-8">
			Get the latest version of my CV to learn more about my skills,
			experience, and qualifications. For privacy reasons, I have redacted sensitive information from the public version.
		</p>

		<a
			href="/api/download-cv"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-block"
		>
			<Button class="w-full sm:w-auto">
				<FileDown class="mr-2 h-4 w-4" />
				Download Latest CV
			</Button>
		</a>
	</div>
</div>
