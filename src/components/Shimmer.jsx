export default function Shimmer() {
	return (
		<div className="animate-pulse bg-gray-800 rounded-lg overflow-hidden">
			<div className="w-full aspect-video bg-gray-700" />
			<div className="p-3">
				<div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
				<div className="h-3 bg-gray-700 rounded w-1/2" />
			</div>
		</div>
	);
}
