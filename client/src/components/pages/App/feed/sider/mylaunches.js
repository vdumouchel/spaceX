Query query={listMyLaunches}>
				{({ loading, errors, data }) => {
					if (loading)
						return (
							<div>
								<CardSkeleton />
							</div>
						);
					if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
					return (
						<div>
							<div>
								{data.listMyLaunches.map(item => (
									<Launch key={item.flight_number} data={item} {...props} />
								))}
							</div>
						</div>
					);
				}}
			</Query>