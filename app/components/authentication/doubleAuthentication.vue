<template>
	
	<form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
		<input type="text" id="digit-1" name="digit-1" data-next="digit-2" placeholder="-" />
		<input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" placeholder="-" />
		<input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" placeholder="-" />
		<input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" placeholder="-" />
		<input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" placeholder="-" />
		<input type="text" id="digit-6" name="digit-6" data-previous="digit-5" placeholder="-" />
</form>
</template>