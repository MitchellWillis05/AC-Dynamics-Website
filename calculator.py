def calculate_heating_kw(width, length, height, indoor_temp, outdoor_temp, insulation_factor):
    # Step 1: Calculate room volume
    room_volume = width * length * height

    # Step 2: Calculate temperature difference
    temp_difference = indoor_temp - outdoor_temp

    # Step 3: Calculate the heating requirement in kW
    heating_kw = (room_volume * temp_difference * insulation_factor) / 3412

    return heating_kw


# Example usage
width = 5  # meters
length = 6  # meters
height = 2.5  # meters
indoor_temp = 22  # degrees Celsius
outdoor_temp = 5  # degrees Celsius
insulation_factor = 1.3  # Average insulation

# Calculate heating kW
heating_required = calculate_heating_kw(width, length, height, indoor_temp, outdoor_temp, insulation_factor)
print(f"Heating required: {heating_required:.3f} kW")