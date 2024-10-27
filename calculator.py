def calculate_heating_single(width, length, height, outdoor_temp, insulation_factor):
    # Step 1: Calculate room volume
    room_volume = float(width) * float(length) * float(height)

    # Step 2: Calculate temperature difference
    temp_difference = 20 - float(outdoor_temp)

    # Step 3: Calculate the heating requirement in kW
    heating_kw = (room_volume * temp_difference * float(insulation_factor)) / 3412

    return heating_kw


def calculate_heating_whole_house(area, height, outdoor_temp, insulation_factor):
    # Convert all inputs to floats
    area = float(area)
    height = float(height)
    outdoor_temp = float(outdoor_temp)
    insulation_factor = float(insulation_factor)

    # Step 1: Calculate house volume
    house_volume = area * height

    # Step 2: Calculate temperature difference
    temp_difference = 20 - outdoor_temp

    # Step 3: Calculate the heating requirement in kW
    heating_kw = (house_volume * temp_difference * insulation_factor) / 3412

    return heating_kw





