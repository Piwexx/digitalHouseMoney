import { Service } from '@/types/service';

export async function getService(): Promise<Service[]> {
	return fetch(`https://digitalmoney.digitalhouse.com/service`)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			throw error;
		});
}

export async function getServiceById(id: number): Promise<Service> {
	return fetch(`https://digitalmoney.digitalhouse.com/service/${id}`)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			throw error;
		});
}