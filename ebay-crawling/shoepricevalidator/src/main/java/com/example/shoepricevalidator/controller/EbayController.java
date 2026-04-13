package com.example.shoepricevalidator.controller;

import com.example.shoepricevalidator.dto.EbayItemDto;
import com.example.shoepricevalidator.service.EbayService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EbayController {

    private final EbayService ebayService;

    public EbayController(EbayService ebayService) {
        this.ebayService = ebayService;
    }

    @GetMapping("/ebay/test")
    public List<EbayItemDto> test(@RequestParam String keyword) {
        return ebayService.searchItems(keyword);
    }
}